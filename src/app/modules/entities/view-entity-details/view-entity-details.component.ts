import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EntityService } from '../../admin-core/services/entity-service/entity.service';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../../admin-core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';



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
  queryParams = {
    page: 1,
    size: 10,
  };
  type: any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') searchInput: ElementRef;
  constructor(private entityService: EntityService,
    private route: ActivatedRoute, private commonServiceService: CommonServiceService) { }


  sideMenu = [{
    label: 'District',
    value: 'district'
  }, {
    label: 'Zone',
    value: 'zone'
  }, {
    label: 'School',
    value: 'school'
  }, {
    label: 'Cluster',
    value: 'cluster'
  }, {
    label: 'Hub',
    value: 'hub'
  }]

  ngOnInit() {
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      // this.getOrganisationList();
      this.subEntity();
    });
    this.entityId = this.route.snapshot.paramMap.get('id');
    this.entityDetails();
    this.subEntity();
  }

  // get Entity Details
  entityDetails() {
    this.entityService.getEntityDetails(this.entityId).subscribe(data => {
      console.log('getEntityDetails', data);
      this.entityInfo = data['result'][0]
      this.metaData = data['result'][0]['metaInformation'];
      //  ['metaInformation']['name']

    }, error => {
      this.commonServiceService.errorHandling(error);
    })

  }


  entityChange(data){
    this.type = data;
    this.subEntity();
    this.paginator.firstPage();
  }


  // get subentity details
  subEntity() {
    this.entityService.getSubEntityList(this.entityId, this.type, this.searchInput.nativeElement.value, this.queryParams).subscribe(data => {
      this.entityListData = data['result'];
      // this.refreshDatasource(data['result']['data']);
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
    })
  }


  getItemCssClassByStatus(status): string {
    switch (status) {
      case 'Active':
        return 'active';
      case 'Inactive':
        return 'inactive';
    }
    return '';
  }

  ViewData(data) {

  }


}
