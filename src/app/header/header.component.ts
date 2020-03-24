import { Component, OnInit } from '@angular/core';
import { keyCloakService, UsersService } from '../modules/admin-core';



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
  constructor(private KeycloakService: keyCloakService, private usersService: UsersService) {

  }
  async ngOnInit() {
    // this.userdetails = this.KeycloakService.getKeycloakInstance();
    //  let res =  await this.usersService.getUserRoles();
    this.userdetails =  JSON.parse(localStorage.getItem('userdetails'));
     this.user_role = await localStorage.getItem('user_role');
    if (this.userdetails) {
      this.username = this.userdetails.firstName;
    }
    let menu = [];

    let home = {
      value: "Home",
      anchorLink: "/home",
      icon: "description",
    }

    let users = {
      value: "Create Users",
      anchorLink: "/users",
      icon: "description"
    };

    let unauthorized = {
      value: "Assign Users",
      anchorLink: "/unauthorized",
      icon: "rate_review"
    }


    if (this.user_role === 'OBS_DESIGNER') {
      menu.push(home);
      menu.push(unauthorized);
    }
    if (this.user_role === 'OBS_REVIEWER') {
      menu.push(users);
    }

    this.links = [{
      linkHeading: "headings.features",
      values: menu
    }
    ];
   this.menuarray =  this.links[0].values;
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
