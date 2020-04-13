import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { keyCloakService, UsersService } from './modules/admin-core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin-portal';
  roles: any;
  constructor(private usersService: UsersService,
    private router: Router, private keycloak: keyCloakService) {
  }

  // Initial loading
  ngOnInit() {
    this.getBasicdetails();
    this.userRoles();
  }

  getBasicdetails() {
    this.keycloak.setToken();
  }

  /**
  * To get the form from the backend
  */
 async userRoles() {
     const rolesdata =  await this.usersService.getUserRoles();
     console.log('apppcomponent', rolesdata);
     localStorage.setItem('user_role', rolesdata['result'].roles);
  }

}
