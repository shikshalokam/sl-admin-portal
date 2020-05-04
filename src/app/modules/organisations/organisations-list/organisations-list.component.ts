import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import { OrganisationService } from '../../admin-core';


@Component({
  selector: 'app-organisations-list',
  templateUrl: './organisations-list.component.html',
  styleUrls: ['./organisations-list.component.scss']
})
export class OrganisationsListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'Organisation', 'description', 'status', 'role', 'Action'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel(true, []);
  listing: boolean = true;
  recordCount: any;
  columns: any;
  usersListData: any;
  queryParams = {
    page: 1,
    size: 10,
  };
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private organisationService: OrganisationService) { }

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
      this.getUserList();
    });
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.getUserList();
    });
  }

  /**
* To get Userslist
*/
  getUserList() {
    this.organisationService.getOrganisationList().subscribe(data => {
      this.usersListData = data['result'];
      this.refreshDatasource(data['result'].data);
      this.dataSource = new MatTableDataSource(data['result'].data);
      this.columns = new MatTableDataSource(data['result'].columns);
      this.dataSource.sort = this.sort;
      this.recordCount = data['result'].count;
      this.listing = true;
    }, error => {
      this.listing = true;

    });
  }

  refreshDatasource(data) {
    this.dataSource = data;
  }

  // For adding new organisation
  addNewOrganisation() {

  }

  // To download organisations
  downloadOrganisations() {

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
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.length + 1}`;
  }

}
