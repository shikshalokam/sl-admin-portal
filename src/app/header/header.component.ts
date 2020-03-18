import { Component, OnInit } from '@angular/core';
import { keyCloakService } from '../modules/admin-core';
keyCloakService


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userdetails: any;
  username: any;
  constructor(private KeycloakService: keyCloakService) { }
  ngOnInit() {
    this.userdetails = this.KeycloakService.getCurrentUserDetails();
    console.log('**********', this.userdetails);
    if (this.userdetails)
      this.username = this.userdetails.name;
  }

  sidemenu() {
    console.log('sidemenu');
  }

  /**
   * This is used to logout from the application
   */
  logout() {
    this.KeycloakService.logout();
  }

}
