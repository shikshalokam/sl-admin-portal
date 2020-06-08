import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EntityService } from '../../admin-core/services/entity-service/entity.service';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService, constants } from '../../admin-core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { ViewSubEntityDetailsComponent } from '../view-sub-entity-details/view-sub-entity-details.component';



@Component({
  selector: 'app-view-entity-details',
  templateUrl: './view-entity-details.component.html',
  styleUrls: ['./view-entity-details.component.scss']
})
export class ViewEntityDetailsComponent implements OnInit {
  entityId: any;
  metaData: any;
  entityInfo: any;
  displayedColumns: any = [];
  dataSource: any;
  entityListData: any;
  listing: boolean = false;
  columns: any;
  recordCount: any;
  search: any = '';
  viewSubEntitymetaData: any;
  childHierarchary: any;
  queryParams = {
    page: 1,
    size: 10,
  };
  crumData: any;
  type: any = '';
  relatedEntities: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') searchInput: ElementRef;
  paginationOptions = constants.paginationOptions;
  initialOption = constants.initialOption;
  constructor(public dialog: MatDialog, private entityService: EntityService,
    private route: ActivatedRoute, private commonServiceService: CommonServiceService) { }


  ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        this.crumData = data;
      });
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.subEntity();
    });
    this.entityId = this.route.snapshot.paramMap.get('id');
    this.entityDetails();
  }

  // get Entity Details
  entityDetails() {
    this.entityService.getEntityDetails(this.entityId).subscribe(data => {
      this.entityInfo = data['result'];
      this.metaData = data['result']['metaInformation'];

      if (data['result']['childHierarchyPath']) {
        this.childHierarchary = data['result']['childHierarchyPath'];
        this.type = data['result']['childHierarchyPath'][0];
      } else {
        this.commonServiceService.commonSnackBar('No Hierarchy Data found', 'Dismiss', 'top', 1000)
        this.listing = true;
      }
      this.subEntity();

    }, error => {
      this.commonServiceService.errorHandling(error);
    })

  }

  // on selecting the entity
  entityChange(data) {
    this.type = data;
    this.searchInput.nativeElement.value = '';
    this.subEntity();
    this.paginator.firstPage();
  }


  // get subentity details
  subEntity() {
    this.entityService.getSubEntityList(this.entityId, this.type, this.searchInput.nativeElement.value, this.queryParams).subscribe(data => {
      this.entityListData = data['result'];
      this.displayedColumns = [];
      this.dataSource = new MatTableDataSource(data['result']['data']);
      this.columns = data['result']['columns'];
      if (this.entityListData) {
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
    })
  }


  getItemCssClassByStatus(status): string {
    switch (status) {
      case 'Active':
        return 'active';
      case 'Inactive':
        return 'inactive';
    }
  }

  ViewData(data) {
    this.entityService.getEntityDetails(data._id).subscribe(data => {
      const viewSubEntitymetaData = data['result'];
      const dialogRef = this.dialog.open(ViewSubEntityDetailsComponent
        , {
          disableClose: true,
          width: '50%',
          data: { viewSubEntitymetaData }
        });
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }

  // view hierarchy
  viewHierarchy(data) {
    this.entityService.getRelatedEntities(data._id).subscribe(data => {
      this.relatedEntities = data['result']['relatedEntities'];
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }

  goToEntityType(data) {
    // this.entityChange(data.entityType);
  }

}
