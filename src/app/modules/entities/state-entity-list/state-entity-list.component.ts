import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { EntityService } from '../../admin-core/services/entity-service/entity.service';
import { CommonServiceService } from '../../admin-core';
import { Router } from '@angular/router';


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
  queryParams = {
    page: 1,
    size: 10,
  };
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private entityService: EntityService,
    private commonServiceService: CommonServiceService,
    private router: Router) { }

  ngOnInit() {
    this.getEntityStateList();
  }

  /**
  * To get EntityStateList
  */
  getEntityStateList() {
    this.entityService.getStatesList(this.queryParams).subscribe(data => {
      console.log('getEntityStateList', data);
      this.EntityStateList = data['result'];
      // this.refreshDatasource(data['result']['data']);
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
    return '';
  }

  viewDetails(entity){
    this.router.navigate(['/entities/entitydetails', entity._id])
  }

}
