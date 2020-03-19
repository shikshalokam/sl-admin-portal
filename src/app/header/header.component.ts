import { Component, OnInit } from '@angular/core';
import { keyCloakService } from '../modules/admin-core';




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
    // this.userdetails = this.KeycloakService.getKeycloakInstance();
    this.userdetails = JSON.parse(localStorage.getItem('userdetails'));
    console.log('**********', this.userdetails);
    if (this.userdetails)
      this.username = this.userdetails.firstName;
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
