import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  editUserDetails: any;
  panelOpenState: boolean = false;
  constructor(private commonServiceService: CommonServiceService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.editUserDetails = this.commonServiceService.showEditUserDetails();
    console.log(' this.editUserDetails', this.editUserDetails);
  }

  reset() {
    this._snackBar.open('Comming soon', 'Dismiss', {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

  editPersonalData() {

  }

  editRoles() {

  }

}
