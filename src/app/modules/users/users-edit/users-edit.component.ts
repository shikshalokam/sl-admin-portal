import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared/confirm-dialog/confirm-dialog.component';
import { UsersService } from '../../admin-core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  editUserDetails: any;
  panelOpenState: boolean = false;
  confirmPopupResult: any;
  constructor(private commonServiceService: CommonServiceService,
    private _snackBar: MatSnackBar, private dialog: MatDialog,
    private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUserDetails(id);
  }

  reset() {
    this.commonServiceService.commonSnackBar('comming', 'Dismiss', 'top', '10000');
  }

  // User Details
  getUserDetails(id) {
    this.usersService.singleUserDetails(id).subscribe(data => {
      this.editUserDetails = data['result'];
      console.log(' this.editUserDetails',  this.editUserDetails);
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 1000)
    })
  }

  editPersonalData() {

  }

  editRoles() {

  }

  confirmDialog(): void {
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

  // Block User
  blockUser() {
    this.usersService.blockUser(this.editUserDetails.id).subscribe(data => {
      this.commonServiceService.commonSnackBar('User Blocked', 'Dismiss', 'top', '10000');
    }, error => {
      console.log('blockUser', error);
    })
  }

}
