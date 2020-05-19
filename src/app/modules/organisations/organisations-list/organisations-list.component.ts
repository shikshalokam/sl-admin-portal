import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { fromEvent, of, Observable } from 'rxjs';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import { OrganisationService } from '../../admin-core';
import { CreateandEditOrganisationComponent } from '../createandEdit-organisation/createandEdit-organisation.component';
import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared';


@Component({
  selector: 'app-organisations-list',
  templateUrl: './organisations-list.component.html',
  styleUrls: ['./organisations-list.component.scss']
})
export class OrganisationsListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: any = [];
  selection = new SelectionModel(true, []);
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
  queryParams = {
    page: 1,
    size: 10,
  };
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private organisationService: OrganisationService, private router: Router,
    private dialog: MatDialog, private commonServiceService: CommonServiceService) { }

  ngOnInit() {

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2 || res.length == 0)
      // Time in milliseconds between key events
      // , debounceTime(1000)
      // If previous query is diffent from current
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      this.getOrganisationList();
    });
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
    this.organisationService.organisationList(this.queryParams, this.searchInput.nativeElement.value, this.status).subscribe(data => {
      this.organisationListData = data['result'];
      this.refreshDatasource(data['result']['data']);
      this.displayedColumns = [];
      this.dataSource = new MatTableDataSource(data['result']['data']);
      this.columns = data['result']['columns'];
      if (this.organisationListData) {
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
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    });
  }

  // Organisation Form
  createOrganisationForm() {
    this.organisationService.getOrganisationForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsForOrganisation = this.formdata;
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    });
  }

  // confirmDialog
  confirmDialog(data) {
    this.orgObject = data;
    const message = `Are you sure you want to do this action ?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "310px",
      height: "200px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        this.activateDeActivateOrganisation(this.orgObject);
      } else {
        this.dialog.closeAll();
      }

    });
  }


  // Activate and Deactivate User
  activateDeActivateOrganisation(data) {
    if (data.status === 'Active') {
      this.assignedStatus = 0;
    } else {
      this.assignedStatus = 1;
    }
    let updateData = {
      organisationId: data._id,
      status: this.assignedStatus
    }
    this.organisationService.activateDeActivateOrganisation(updateData).subscribe(data => {
      setTimeout(() => {
        this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', '10000');
        this.getOrganisationList();
      }, 1000);

    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    })
  }

  editOrganisation(data) {
    console.log('edit', data);

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
      console.log('The dialog was closed');
      this.getOrganisationList();
    });
  }

  // To download organisations
  downloadOrganisations() {
    this.commingSoon();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.length + 1}`;
  // }

  commingSoon() {
    this.commonServiceService.commonSnackBar('Comming soon', 'Dismiss', 'top', 1000);
  }
}





