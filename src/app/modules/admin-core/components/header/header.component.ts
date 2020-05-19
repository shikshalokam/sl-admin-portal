import { Component, OnInit } from '@angular/core';
import { keyCloakService, UsersService } from '../..';
import { MatSnackBar } from '@angular/material';
import { CommonServiceService } from '../../services/common-service.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userdetails: any;
  username: any;
  user_role: any;
  links: any[];
  menuarray: any[];
  message: any;
  constructor(private KeycloakService: keyCloakService, private usersService: UsersService,
    private _snackBar: MatSnackBar, private commonServiceService: CommonServiceService) {

  }
   ngOnInit() {
    this.userdetails = this.commonServiceService.getUserDetails();
    if (this.userdetails) {
      this.username = this.userdetails.username;
    }
  }

  sidemenu() {
  }

  notifications() {
    this._snackBar.open('Comming soon', 'Dismiss', {
      duration: 10000,
      verticalPosition: 'top'
    });
  }

  /**
   * This is used to logout from the application
   */
  logout() {
    this.KeycloakService.logout();
  }

}
