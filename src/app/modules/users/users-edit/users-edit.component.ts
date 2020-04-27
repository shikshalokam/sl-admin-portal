import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared/confirm-dialog/confirm-dialog.component';
import { UsersService } from '../../admin-core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RolesEditComponent } from '../roles-edit/roles-edit.component';




@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  displayedColumns: string[] = ['organisation', 'Roles', 'Action']

  editUserDetails: any;
  details: any;
  confirmPopupResult: any;
  visible = true;
  selectable = true;
  removable = true;
  load: boolean = false;
  makedisable: boolean = true;
  roleCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  roles: string[] = [];
  filterValue: any;
  userId: any;

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(private commonServiceService: CommonServiceService,
    private _snackBar: MatSnackBar, private dialog: MatDialog,
    private usersService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUserDetails();
  }

  reset() {
    this.commonServiceService.commonSnackBar('Comming soon', 'Dismiss', 'top', '10000');
  }

  // User Details
  getUserDetails() {
    this.usersService.singleUserDetails(this.userId).subscribe(data => {
      this.editUserDetails = data['result'];
      console.log('editUserDetails', this.editUserDetails);
      this.details = this.editUserDetails.organisations;
      this.editUserDetails.roleslist = []
      for (let i = 0; i < this.details.length; i++) {
        this.details[i].list = [];
        for (let j = 0; j< this.details[i].roles.length; j++){
          this.details[i].list.push(this.details[i].roles[j].label);
        }
      }
      this.load = true;
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 1000)
    })
  }

  // In activate
  inActivateDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        this.blockUser();
      } else {
        this.dialog.closeAll();
      }

    });
  }

  // activate
  activateDialog() {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        this.unBlockUser();
      } else {
        this.dialog.closeAll();
      }

    });
  }

  // Block User
  blockUser() {
    this.usersService.blockUser(this.userId).subscribe(data => {
      this.commonServiceService.commonSnackBar('User Blocked', 'Dismiss', 'top', '10000');
    }, error => {
      console.log('blockUser', error);
    })
  }

  // Block User
  unBlockUser() {
    this.usersService.unBlockUser(this.userId).subscribe(data => {
      this.commonServiceService.commonSnackBar('User Blocked', 'Dismiss', 'top', '10000');
    }, error => {
      console.log('blockUser', error);
    })
  }

// Edit popup
  Edit(data) {
    const finaldata = []
    finaldata.push(this.editUserDetails);
    finaldata.push(data);
    const dialogRef = this.dialog.open(RolesEditComponent, {
      disableClose: true,
      width: '30%',
      data: finaldata
    });
  }

  // Add New Organisation 
  newOrganisation() {
    this.commonServiceService.commonSnackBar('Comming soon', 'Dismiss', 'top', '1000')
  }

}
