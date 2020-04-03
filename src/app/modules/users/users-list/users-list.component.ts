import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddMultipleUsersComponent } from '../add-multiple-users/add-multiple-users.component';
import { UsersService } from '../../admin-core';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  myControl = new FormControl();
  options: any[];
  firstorganisationValue: any;
  filteredOptions: Observable<string[]>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private usersService: UsersService) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getUserOrginasations();
  }

  /**
   * To get the form from the backend
   */
  getUserOrginasations() {
    this.usersService.getOrganisations().subscribe(data => {
      this.options = data['result'];
      this.myControl.setValue(this.options[0].label);
      this.firstorganisationValue = this.options[0].value;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }, error => {

    });
  }

  // displayFn(label): any {
  //   console.log('bhvhgvg', label);
  //   return label
  // }

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
        width: '50%',
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
        width: '50%',
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
