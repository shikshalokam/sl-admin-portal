import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-single-user/add-single-user.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { fromEvent, merge, Subscription, of } from 'rxjs';
import { AddMultipleUsersComponent } from '../add-multiple-users/add-multiple-users.component';
import { UsersService } from '../../admin-core';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, startWith, distinctUntilChanged, map, tap, skip, delay, take, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'email', 'gender', 'Action'];
  myControl = new FormControl();
  dataSource: MatTableDataSource<any>;
  selected: any;
  options: any[];
  organisations: any;
  organisationsList: any;
  spin: any;
  recordCount: any;
  formdata: any;
  fieldsBackend: any;
  listing: boolean = false;
  orgnsationId: any;
  loading: boolean = false;
  usersId: any[];
  dataArray: any[];
  queryParams = {
    page: 1,
    size: 10,
  };
  firstorganisationValue: any;
  filteredOptions: any;

  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') searchInput: ElementRef;
  filterStatus: string = '';
  filterType: string = '';

  constructor(public dialog: MatDialog, private usersService: UsersService,
    public cdr: ChangeDetectorRef, private _snackBar: MatSnackBar, ) {
  }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      // ,filter(res => res.length > 2)
      // Time in milliseconds between key events
      , debounceTime(1000)
      // If previous query is diffent from current
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      this.getUserList();
    });
    this.getUserOrginasations();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.getUserList();
    });
    this.createForm();
  }

  /**
* To get Userslist
*/
  getUserList() {
    this.usersService.getUsers(this.queryParams, this.orgnsationId, this.searchInput.nativeElement.value).subscribe(data => {
      this.options = data['result'];
      this.refreshDatasource(data['result'].data);
      this.dataSource = new MatTableDataSource(data['result'].data);
      this.dataSource.sort = this.sort;
      this.recordCount = data['result'].count;
      this.cdr.detectChanges();
      this.listing = true;
    }, error => {
      this.listing = true;
      this._snackBar.open(error.error.message, 'Error', {
        duration: 2000,
      });
    });
  }
  refreshDatasource(data) {
    this.dataSource = data;
  }

  // change of organisation
  selectorganisation() {
    this.orgnsationId = this.selected;
    this.getUserList();
    this.paginator.firstPage();
  }

  // on search key
  onKey(value) {
    if (value) {
      this.organisations = this.selectSearch(value);
      this.cdr.detectChanges();
    } else {
      this.organisations = this.organisationsList;
    }
  }

  // To filter the data
  selectSearch(value: string) {
    this.dataArray = [];
    let filter = value.toLowerCase();
    for (let i = 0; i < this.organisationsList.length; i++) {
      let option = this.organisationsList[i];
      if (option.label.toLowerCase().indexOf(filter) >= 0) {
        this.dataArray.push(option);
      }
    }
    return this.dataArray;
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

  /**
   * To get the form from the backend
   */
  getUserOrginasations() {
    this.usersService.getOrganisations().subscribe(data => {
      if (data['result']) {
        this.organisations = data['result'];
        this.organisationsList = data['result'];
        this.myControl.setValue(this.organisations[0].label);
        this.firstorganisationValue = this.organisations[0].value;
        this.orgnsationId = this.firstorganisationValue
        this.selected = this.firstorganisationValue;
        this.getUserList();
      } else {
        this._snackBar.open('No Organisations Found', 'Error', {
          duration: 2000,
        });
      }
    }, error => {
      this._snackBar.open('No Organisations Found', 'Error', {
        duration: 2000,
      });
    });
  }


  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.selection.selected);
  }

  createForm() {
    this.usersService.getUserForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsBackend = this.formdata.form;
    }, error => {

    });
  }
  addNewUser() {
    this.openDialog(this.fieldsBackend);
  }
  // Adding single user popup
  openDialog(fieldsBackend): void {
    const dialogRef = this.dialog.open(AddUserComponent
      , {
        disableClose: true,
        width: '50%',
        data: { fieldsBackend }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getUserList();
    });
  }

  // Adding multiple users popup
  UploadUsers() {
    const dialogRef = this.dialog.open(AddMultipleUsersComponent
      , {
        disableClose: true,
        width: '30%',
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getUserList();
    });
  }
  onRowClicked(row) {
    console.log('=====', this.selection.selected)
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



  // Download users
  downloadUsers(data) {
    this.downloadapi();
  }

  downloadapi() {
    const selectedData = this.selection.selected
    this.usersId = [];
    for (let i = 0; i < selectedData.length; i++) {
      this.usersId.push(selectedData[i]['id']);
    }
    let data = {
      usersList: this.usersId,
      organisationId: this.orgnsationId,
      limit: 100,
      page: 1
    }
    this.usersService.getDownloadUsers(data).subscribe(data => {
      console.log('downloadapi', data);
    },
      error => {
        console.log('error', error);
        this.downLoadFile(error.error.text, "text/csv");
      }
    )
  }

  // To download selected records
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    this._snackBar.open('Users Downloaded Sucessfully', 'sucess', {
      duration: 2000
    })
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  onFilterChange(data, row) {
    console.log('onFilterChange', row);

  }

  // To Edit the user
  editUser(user) {

  }

  ViewUser(user) {

  }

  commingsoon() {
    this._snackBar.open('Comming soon', 'Close', {
      duration: 2000,
    });
  }


}

