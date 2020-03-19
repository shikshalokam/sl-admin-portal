import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder, private usersService: UsersService,
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
  userRoles() {
    this.usersService.getUserRoles().subscribe(data => {
      this.roles = data;
    }, error => {

    });
  }

}
