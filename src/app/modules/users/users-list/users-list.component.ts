import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-single-user/add-single-user.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { AddMultipleUsersComponent } from '../add-multiple-users/add-multiple-users.component';
import { UsersService } from '../../admin-core';
import { SelectionModel } from '@angular/cdk/collections';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { saveAs as importedSaveAs } from "file-saver";
import { Router } from '@angular/router';
import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  // displayedColumns: any;
  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'gender', 'status', 'role', 'Action'];
  myControl = new FormControl();
  dataSource: MatTableDataSource<any>;
  columns: any;
  selected: any;
  date = new Date();
  fileName: any;
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
  status: any = '';
  userObject: any;
  confirmPopupResult: any;
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
    public cdr: ChangeDetectorRef, private _snackBar: MatSnackBar, private router: Router,
    private commonServiceService: CommonServiceService) {
  }

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
    this.getUserOrginasations();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.queryParams.page = page.pageIndex + 1;
      this.queryParams.size = page.pageSize;
      this.getUserList();
    });
    this.createForm();
    this.fileName = this.date.toLocaleDateString() + '-' + this.date.toLocaleTimeString();
  }

  /**
* To get Userslist
*/
  getUserList() {
    this.usersService.getUsers(this.queryParams, this.orgnsationId, this.searchInput.nativeElement.value, this.status).subscribe(data => {
      this.options = data['result'];
      this.refreshDatasource(data['result'].data);
      this.dataSource = new MatTableDataSource(data['result'].data);
      this.columns = new MatTableDataSource(data['result'].columns);
      // this.displayedColumns = this.columns.map(column => column.label);
      this.dataSource.sort = this.sort;
      this.recordCount = data['result'].count;
      this.cdr.detectChanges();
      this.listing = true;
    }, error => {
      this.listing = true;
      this._snackBar.open(error.error.message, 'Dismiss', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }
  refreshDatasource(data) {
    this.dataSource = data;
  }


  // Display the status based on id
  getStatus(status): string {
    switch (status) {
      case 0:
        return 'Inactive';
      case 1:
        return 'Active';
    }
    return '-- --';
  }

  // Filtering the data on status
  allUsers(value) {
    switch (value) {
      case 'Inactive':
        this.status = 0;
        break;
      case 'Active':
        this.status = 1;
        break;
      case 'All':
        this.status = '';
        break;
    }
    this.getUserList();
  }

  activeUsers() {

  }

  inActiveUsers() {

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
        this._snackBar.open('No Organisations Found', 'Dismiss', {
          duration: 10000,
          verticalPosition: 'top'
        });
        this.listing = true;
      }
    }, error => {
      this._snackBar.open('No Organisations Found', 'Dismiss', {
        duration: 10000,
        verticalPosition: 'top'
      });
    });
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.getUserList();
      this.cdr.detectChanges();
    }, 3000)
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
  // get color based on the status
  getItemCssClassByStatus(status): string {
    switch (status) {
      case 1:
        return 'active';
      case 0:
        return 'inactive';
    }
    return '';
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
    importedSaveAs(blob, this.fileName);
    // let url = window.URL.createObjectURL(blob);
    // let pwa = window.open(url);
    this._snackBar.open('Users Downloaded Successfully', 'success', {
      duration: 10000,
      verticalPosition: 'top'
    })
  }


  commingsoon() {
    this._snackBar.open('Comming soon', 'Dismiss', {
      duration: 10000,
      verticalPosition: 'top',
      // horizontalPosition: 'end',
    });
  }

  

  // confirmDialog
  confirmDialog(user) {
    this.userObject = user;
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        this.activate_deActivate_User();
      } else {
        this.dialog.closeAll();
      }

    });
  }

 

  // Activate and Deactivate User
  activate_deActivate_User() {
    this.usersService.active_deActive_User(this.userObject.id, this.userObject).subscribe(data => {
      setTimeout(() => {
        this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', '10000');
        this.getUserList();
      }, 1000);

    }, error => {
      console.log('blockUser', error);
    })
  }

  editUser(user) {
    this.router.navigate(['/users/edit', user.id])
  }



}

