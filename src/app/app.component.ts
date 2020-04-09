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
    this.sendMessage();

  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.usersService.sendMessage('Message from app Component to message Component!');
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
  userRoles() {
    //  const rolesdata =  this.usersService.getCurrentUserRoles();
    this.usersService.getUserRoles().subscribe(data => {
      this.roles = data['result'];
      console.log('userRoles',this.roles);
      localStorage.setItem('user_role', this.roles.roles[0]);
    }, error => {

    });
  }

}
