import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddMultipleUsersComponent } from '../add-multiple-users/add-multiple-users.component';
import { UsersService } from '../../admin-core';
import { SelectionModel } from '@angular/cdk/collections';
import { QueryParamsModel } from '../../admin-core/modals/query-params.model';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  myControl = new FormControl();
 
  selected: any;
  selectedorganisation: any;
  options: any[];
  organisations: any;
  spin: any;
  recordcount: any;
  listing: boolean = false;
  orgnsationid: any;
  queryParams = {
    sortType: 0,
    page: 0,
    size: 10,
    sort: 'id',
    order: 'ASCENDING'
  };
  dataSource: any;
  firstorganisationValue: any;
  filteredOptions: any;
  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'email', 'Action'];
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') searchInput: ElementRef;
  filterStatus: string = '';
  filterType: string = '';

  constructor(public dialog: MatDialog, private usersService: UsersService) {
  }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    this.getUserOrginasations();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex;
      this.queryParams.size = page.pageSize;
      this.getUserList();
    });
  }
  /**
* To get Userslist
*/
  getUserList() {
    console.log('************', this.queryParams, this.searchInput.nativeElement.value);
    this.usersService.getUsers(this.queryParams, this.orgnsationid,this.searchInput.nativeElement.value).subscribe(data => {
      this.options = data['result'];
      this.dataSource = new MatTableDataSource(data['result'].usersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.paginator.pageIndex = data['result'].pageable.pageNumber;
      (<any>this.paginator)._length = data['result'].count;
      this.listing = true;
      console.log('lissssssssssss', this.options);
    }, error => {

    });
  }

  selectorganisation(){
    this.orgnsationid  = this.selected;
    this.getUserList();
  }

  onKey(value) {
    this.selectedorganisation = this.search(value);
    console.log('=====',  this.selectedorganisation)
  }

  // Filter the states list and send back to populate the selectedStates**
  search(value) {
    let filter = value.toLowerCase();
    return this.organisations.filter(option => option.label.toLowerCase().startsWith(filter));
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if(this.dataSource){
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
      this.options = data['result'];
      console.log('getUserOrginasations', this.options);
      this.organisations = data['result'];
      this.myControl.setValue(this.options[0].label);
      this.firstorganisationValue = this.options[0].value;
      this.orgnsationid = this.firstorganisationValue 
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

  // Adding single user popup
  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent
      , {
        width: '40%',
        height: '60%',
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Adding multiple users popup
  UploadUsers() {
    const dialogRef = this.dialog.open(AddMultipleUsersComponent
      , {
        width: '30%',
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onRowClicked(row){
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
    this.downloadFile(data.filteredData);
  }

  // To Edit the user
  editUser(user) {

  }

  ViewUser(user) {

  }


}

