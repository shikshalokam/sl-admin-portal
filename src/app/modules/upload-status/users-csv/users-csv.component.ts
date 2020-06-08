import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { BulkuploadService, constants, CommonServiceService } from '../../admin-core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-users-csv',
  templateUrl: './users-csv.component.html',
  styleUrls: ['./users-csv.component.scss']
})
export class UsersCsvComponent implements OnInit {
  toppings = new FormControl();
  dataSource: MatTableDataSource<any>;
  displayedColumns: any = [];
  selection = new SelectionModel(true, []);
  listing: boolean = false;
  recordCount: any;
  initialStatus: any = 'all';
  initialType: any = 'all';
  status: any = '';
  columns: any;
  search: any;
  requestTypes: any;
  type: any = '';
  statusList: any;
  queryParams = {
    page: 1,
    size: 10,
  };
  paginationOptions = constants.paginationOptions;
  initialOption = constants.initialOption;
  organisationListData: any;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private bulkuploadService: BulkuploadService,
    private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.bulkUploadList();
    });
    this.bulkUploadList();
    this.getRequestTypes();
    this.getStatus();
  }

  debounceMethod() {
    this.bulkUploadList();
  }

  // Request Types
  getRequestTypes() {
    this.bulkuploadService.getRequestTypes().subscribe(data => {
      this.requestTypes = data['result'];
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }

  // Status
  getStatus() {
    this.bulkuploadService.getStatus().subscribe(data => {
      this.statusList = data['result'];
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }

  // bulk upload list
  bulkUploadList() {
    this.bulkuploadService.uploadList(this.queryParams, this.searchInput.nativeElement.value, this.status, this.type).subscribe(data => {
      this.organisationListData = data['result'];
      this.displayedColumns = [];
      this.dataSource = new MatTableDataSource(data['result']['data']);
      this.columns = data['result']['column'];
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
      this.commonServiceService.errorHandling(error);
    });
  }

  // request type filter
  requestTypeChange(data) {
    this.type = data.value;
    this.paginator.firstPage();
    this.bulkUploadList();
  }

  selectStatus(data) {
    this.status = data.value;
    this.paginator.firstPage();
    this.bulkUploadList();

  }

  // clear filter
  clearFilter() {
    this.initialStatus = 'all';
    this.initialType = 'all';
    this.status = '';
    this.type = '';
    this.bulkUploadList();
  }


  // get color based on the status
  getItemCssClassByStatus(status): string {
    switch (status) {
      case 'completed':
        return 'active';
      case 'pending':
        return 'inactive';
      case 'failed':
        return 'inactive';
    }
    return '';
  }

  // Api call to get the download links based on type
  downloadLinks(data, type) {
    this.bulkuploadService.getDownloadLinks(data.requestId, type).subscribe(data => {
      this.onNavigate(data['result']['url']);
    }, error => {
      this.commonServiceService.errorHandling(error);
    })

  }

  // To download in the same tab
  onNavigate(link) {
    window.location.href = link;
  }

}
