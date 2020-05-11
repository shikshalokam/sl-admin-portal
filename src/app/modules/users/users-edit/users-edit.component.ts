import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared/confirm-dialog/confirm-dialog.component';
import { UsersService } from '../../admin-core';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { RolesEditComponent } from '../roles-edit/roles-edit.component';
import { DatePipe } from '@angular/common';
import { AddOrganisationComponent } from '../add-organisation/add-organisation.component';



@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  displayedColumns: string[] = ['Organisation', 'Roles', 'Action']
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
  crumData: any;
  deleteUserDetails: any;
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(private commonServiceService: CommonServiceService,
    private dialog: MatDialog,
    private router: Router,
    private usersService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUserDetails();
    this.route
      .data
      .subscribe(data => {
        this.crumData = data;
      });

  }

  reset() {
    this.commonServiceService.commonSnackBar('Comming soon', 'Dismiss', 'top', '10000');
  }

  // User Details
  getUserDetails() {
    this.usersService.singleUserDetails(this.userId).subscribe(data => {
      this.editUserDetails = data['result'];
      this.details = this.editUserDetails.organisations;
      this.editUserDetails.roleslist = []
      for (let i = 0; i < this.details.length; i++) {
        this.details[i].list = [];
        for (let j = 0; j < this.details[i].roles.length; j++) {
          this.details[i].list.push(this.details[i].roles[j].label);
        }
      }
      this.editUserDetails.userId = this.userId;
      this.load = true;
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 1000)
    })
  }

  // confirmDialog
  confirmDialog(): void {
    const message = `Are you sure you want to do this action ?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "310px",
      height: "200px",
      data: dialogData,
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



  // activate and deActivate User
  activate_deActivate_User() {
    this.usersService.activateDeActivateUser(this.userId, this.editUserDetails).subscribe(data => {
      this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', '10000');
      this.router.navigateByUrl('users/list');
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    })
  }


  confirmForUserDelete(data): void {
    this.deleteUserDetails = data;
    const message = `Are you sure you want to do this action ?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "310px",
      height: "200px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        this.deleteUser(this.deleteUserDetails);
      } else {
        this.dialog.closeAll();
      }

    });
  }


  // Edit popup
  editRoles(data) {
    const finaldata = []
    finaldata.push(this.editUserDetails);
    finaldata.push(data);
    let dialogRef = this.dialog.open(RolesEditComponent, {
      disableClose: true,
      width: '40%',
      data: JSON.parse(JSON.stringify(finaldata))
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.getUserDetails();
      } else {
        this.dialog.closeAll();
      }

    });
  }



  // Delete User from the Organisation
  deleteUser(data) {
    let removeUser = {
      userId: this.userId,
      organisationId: data.value
    }
    this.usersService.removeUserFromOrganisation(removeUser).subscribe(data => {
      this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', 10000)
      this.getUserDetails();
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    })

  }

  // Add organisation and roles to the user
  addOrganisation(data) {
    let dialogRef = this.dialog.open(AddOrganisationComponent, {
      disableClose: true,
      width: '40%',
      data: this.editUserDetails
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.getUserDetails();
      }
    });
  }

  // Add New Organisation 
  newOrganisation() {
    this.commonServiceService.commonSnackBar('Comming soon', 'Dismiss', 'top', '1000')
  }

}
