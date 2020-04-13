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
import { QueryParamsModel } from '../../admin-core/modals/query-params.model';
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
  selectedorganisation: any;
  options: any[];
  organisations: any;
  organisationList: any;
  spin: any;
  recordcount: any;
  formdata: any;
  fieldsbackend: any;
  listing: boolean = false;
  orgnsationId: any;
  loading: boolean = false;
  queryParams = {
    sortType: 0,
    page: 1,
    size: 10,
  };
  // dataSource: any;
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
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.recordcount = data['result'].count;
      this.cdr.detectChanges();
      this.listing = true;
      console.log('lissssssssssss', this.options);
    }, error => {

    });
  }
  refreshDatasource(data) {
    this.dataSource = data;
    // this.cdr.detectChanges();
  }

  selectorganisation() {
    this.orgnsationId = this.selected;
    this.getUserList();
  }

  onKey(value) {
    this.organisations = this.search(value);
    this.cdr.detectChanges();
  }

  // Filter the states list and send back to populate the selectedStates**
  search(value) {
    let filter = value.toLowerCase();
    return this.organisationList.filter(option => option.label.toLowerCase().startsWith(filter));
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log('isAllSelected', numSelected);
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
    // console.log('masterToggle', this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    // console.log('checkboxLabel', row);
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
      this.options = data['result'];
      console.log('getUserOrginasations', this.options);
      this.organisations = data['result'];
      this.organisationList = data['result'];
      this.myControl.setValue(this.options[0].label);
      this.firstorganisationValue = this.options[0].value;
      this.orgnsationId = this.firstorganisationValue
      this.selected = this.firstorganisationValue;
      this.getUserList();
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, error => {

    });
  }

  // displayFn(label): any {
  //     return label.label
  // }

  returnFn(user) {
    console.log('user', user);
    // return user ? user.id : undefined;
  }

  chooseFirstOption(values): void {
    console.log('selected value', values.option.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  createForm() {
    this.usersService.getUserForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsbackend = this.formdata.form;
    }, error => {

    });
  }
  addNewUser() {
    this.openDialog(this.fieldsbackend);
  }
  // Adding single user popup
  openDialog(fieldsbackend): void {
    const dialogRef = this.dialog.open(AddUserComponent
      , {
        disableClose: true,
        width: '50%',
        data: { fieldsbackend }
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
    console.log('=====', row)
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // To Download the csv file
  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/csv' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  // Download users
  downloadUsers(data) {
    // this.downloadFile(data.filteredData);
    this.downloadapi();
  }

  downloadapi() {
    let data = {
      usersList: ["1a163eef-f79c-49ac-9745-d3fadca769ad", "66964742-1b61-4e3e-8bb0-a6874dab61e2"],
      organisationId: "0125747659358699520",
    }
    this.usersService.getDownloadUsers(data).subscribe(data => {
      console.log('downloadapi', data);
    },
      error => {

      }
    )
  }

  // To Edit the user
  editUser(user) {

  }

  ViewUser(user) {

  }

  commingsoon() {
    this._snackBar.open('Comming soon', 'Soon', {
      duration: 2000,
    });
  }


}

