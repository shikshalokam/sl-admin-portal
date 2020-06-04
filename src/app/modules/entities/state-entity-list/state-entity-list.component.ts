import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { EntityService } from '../../admin-core/services/entity-service/entity.service';
import { CommonServiceService, constants } from '../../admin-core';
import { Router } from '@angular/router';
import { BulkUploadEntitiesComponent } from '../bulk-upload-entities/bulk-upload-entities.component';
import { CreateandeditStateComponent } from '../createandedit-state/createandedit-state.component';

constants

@Component({
  selector: 'app-state-entity-list',
  templateUrl: './state-entity-list.component.html',
  styleUrls: ['./state-entity-list.component.scss']
})
export class StateEntityListComponent implements OnInit {
  EntityStateList: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: any = [];
  listing: boolean = false;
  recordCount: any;
  columns: any;
  fieldsForOrganisation: any;
  formdata: any;
  confirmPopupResult: any;
  status: any = '';
  orgObject: any;
  assignedStatus: any;
  search: any;
  noData: boolean;
  queryParams = {
    page: 1,
    size: 10,
  };
  fieldsForState: any;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginationOptions = constants.paginationOptions;
  initialOption = constants.initialOption;
  constructor(private entityService: EntityService,
    private commonServiceService: CommonServiceService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.getEntityStateList();
    });
    this.getEntityStateList();
    this.getStateForm();
  }

  applyFilter(data) {
    const filterValue = data;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length < 1) {
      this.noData = true;
    } else {
      this.noData = false;
    }


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getStateForm() {
    this.entityService.getStatesForm().subscribe(data => {
      this.fieldsForState = data['result']
    })
  }

  /**
  * To get EntityStateList
  */
  getEntityStateList() {
    this.entityService.getStatesList(this.queryParams).subscribe(data => {
      this.EntityStateList = data['result'];
      this.displayedColumns = [];
      this.dataSource = new MatTableDataSource(data['result'].data);
      this.columns = data['result']['columns'];
      if (this.EntityStateList) {
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

  // get color based on the status
  getItemCssClassByStatus(status): string {
    switch (status) {
      case 'Active':
        return 'active';
      case 'Inactive':
        return 'inactive';
    }
  }

  viewDetails(entity) {
    this.router.navigate(['/entities/entitydetails', entity._id])
  }

  // bulkUploadEntity() {
  //   const dialogRef = this.dialog.open(BulkUploadEntitiesComponent
  //     , {
  //       disableClose: true,
  //       width: '30%',
  //       data: {}
  //     });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  bulkUploadEntity() {
    this.commonServiceService.commonSnackBar('Comming Soon', 'Dismiss', 'top', 1000)
  }

  bulkEntityMap() {
    this.commonServiceService.commonSnackBar('Comming Soon', 'Dismiss', 'top', 1000)
  }

  addNewState() {
    // this.openDialog(this.fieldsForState);
    this.commonServiceService.commonSnackBar('Comming Soon', 'Dismiss', 'top', 1000)
  }


  // Adding States popup
  openDialog(fieldsForState): void {
    fieldsForState.action = 'Add'
    const dialogRef = this.dialog.open(CreateandeditStateComponent
      , {
        disableClose: true,
        width: '40%',
        data: { fieldsForState }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEntityStateList();
      }
    });
  }

}
