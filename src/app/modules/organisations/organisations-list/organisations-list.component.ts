import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { OrganisationService, constants } from '../../admin-core';
import { CreateandEditOrganisationComponent } from '../createandEdit-organisation/createandEdit-organisation.component';
import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../admin-shared';


@Component({
  selector: 'app-organisations-list',
  templateUrl: './organisations-list.component.html',
  styleUrls: ['./organisations-list.component.scss']
})
export class OrganisationsListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: any = [];
  listing: boolean = false;
  recordCount: any;
  columns: any;
  organisationListData: any;
  fieldsForOrganisation: any;
  formdata: any;
  confirmPopupResult: any;
  status: any = '';
  orgObject: any;
  assignedStatus: any;
  search: any;
  queryParams = {
    page: 1,
    size: 10,
  };
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginationOptions = constants.paginationOptions;
  initialOption = constants.initialOption;
  constructor(private organisationService: OrganisationService, private router: Router,
    private dialog: MatDialog, private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.getOrganisationList();
    });
    this.getOrganisationList();
    this.createOrganisationForm();
  }

  // get color based on the status
  getItemCssClassByStatus(status): string {
    switch (status) {
      case 'Active':
        return 'active';
      case 'Inactive':
        return 'inactive';
    }
    return '';
  }

  // Filtering the data on status
  allOrganisation(value) {
    // this.status = value;
    switch (value) {
      case 'Inactive':
        this.status = 0;
        break;
      case 'Active':
        this.status = 1;
        break;
      case 'All':
        this.status = '';
        break;
    }
    this.paginator.firstPage();
    this.getOrganisationList();
  }

  /**
* To get OrganisationList
*/
  getOrganisationList() {
    this.listing = false;
    this.organisationService.organisationList(this.queryParams, this.searchInput.nativeElement.value, this.status).subscribe(data => {
      this.organisationListData = data['result'];
      this.refreshDatasource(data['result']['data']);
      this.displayedColumns = [];
      this.dataSource = new MatTableDataSource(data['result']['data']);
      this.columns = data['result']['columns'];
      if (this.organisationListData && this.columns) {
        this.columns.forEach(element => {
          if (element.visible) {
            this.displayedColumns.push(element.key)
          }
        });
      }
      this.recordCount = data['result'].count;
      this.listing = true;
    }, error => {
      this.listing = true;
      this.commonServiceService.errorHandling(error);
    });
  }

  // Organisation Form
  createOrganisationForm() {
    this.organisationService.getOrganisationForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsForOrganisation = this.formdata;
    }, error => {
      this.commonServiceService.errorHandling(error);
    });
  }

  // confirmDialog
  confirmDialog(data) {
    this.orgObject = data;
    let confirmData = {
      title: "Confirmation",
      message: "Are you sure you want to do this action ?",
      confirmButtonText: "YES",
      cancelButtonText: "NO"
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "310px",
      height: "200px",
      data: confirmData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        if(this.orgObject.status === 'Active') {
          this.deActivateOrganisation(this.orgObject);
          } else {
            this.activateOrganisation(this.orgObject);
          }
      } else {
        this.dialog.closeAll();
      }

    });
  }

  // activate organisation
  activateOrganisation(data) {
    this.organisationService.activateOrganisation(data).subscribe(data => {
      setTimeout(() => {
        this.getOrganisationList();
        this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', '10000');
      }, 1000)
     
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }

   // deActivate organisation
   deActivateOrganisation(data) {
    this.organisationService.deActivateOrganisation(data).subscribe(data => {
      setTimeout(() => {
        this.getOrganisationList();
        this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', '10000');
      }, 1000)
    
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }
  
  editOrganisation(data) {
    this.router.navigate(['/organisations/edit', data._id])
  }

  refreshDatasource(data) {
    this.dataSource = data;
  }

  // For adding new organisation
  addNewOrganisation() {
    this.openDialog(this.fieldsForOrganisation);
  }

  // Adding Organisation popup
  openDialog(fieldsForOrganisation): void {
    fieldsForOrganisation.action = 'Add'
    const dialogRef = this.dialog.open(CreateandEditOrganisationComponent
      , {
        disableClose: true,
        width: '50%',
        data: { fieldsForOrganisation }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getOrganisationList();
      }
    });
  }

}





