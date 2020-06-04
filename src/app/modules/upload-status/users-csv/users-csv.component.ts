import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { BulkuploadService, constants } from '../../admin-core';
import { SelectionModel } from '@angular/cdk/collections';
import { fromEvent, of, Observable } from 'rxjs';
import { distinctUntilChanged, map, debounceTime, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
constants

@Component({
  selector: 'app-users-csv',
  templateUrl: './users-csv.component.html',
  styleUrls: ['./users-csv.component.scss']
})
export class UsersCsvComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  dataSource: MatTableDataSource<any>;
  displayedColumns: any = [];
  selection = new SelectionModel(true, []);
  listing: boolean = false;
  recordCount: any;
  initialStatus: any = '';
  initialType: any = '';
  status: any = '';
  columns: any;
  search: any;
  statusList = [
    {
      label: 'All',
      value: ''
    }, {
      label: 'Success',
      value: 'success'
    }, {
      label: 'Pending',
      value: 'pending'
    }, {
      label: 'Failed',
      value: 'failed'
    }];

  requestType = [{
    label: 'All',
    value: ''
  }, {
    label: 'User Creation',
    value: 'user Creation'
  },]
  queryParams = {
    page: 1,
    size: 10,
  };
  paginationOptions = constants.paginationOptions;
  initialOption = constants.initialOption;
  organisationListData: any;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private bulkuploadService: BulkuploadService) { }

  ngOnInit() {
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.bulkUploadList();
    });
    this.bulkUploadList();
  }

  debounceMethod() {
    this.bulkUploadList();
  }

  bulkUploadList() {
    this.bulkuploadService.uploadList(this.queryParams, this.searchInput.nativeElement.value, this.status).subscribe(data => {
      this.organisationListData = data['result'];
      // this.refreshDatasource(data['result']['data']);
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
      // this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    });
  }

  // request type filter
  requestTypeChange() {

  }

  selectStatus(data) {
    this.status = data.value;
    this.paginator.firstPage();
    this.bulkUploadList();

  }


  // get color based on the status
  getItemCssClassByStatus(status): string {
    switch (status) {
      case 'Active':
        return 'active';
      case 'pending':
        return 'inactive';
    }
    return '';
  }

  downloadLinks(data, type) {
    this.bulkuploadService.getDownloadLinks(data.requestId, type).subscribe(data => {
      this.onNavigate(data['result']['url']);

    }, error => {

    })

  }

  onNavigate(link) {
    window.open(link, "_blank");
  }

}
