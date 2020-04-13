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
  }

  getBasicdetails() {
    this.keycloak.setToken();
  }

}
