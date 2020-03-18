import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { keyCloakService } from './modules/admin-core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin-portal';
  userdetails: any;

  constructor(private router: Router, private KeycloakService: keyCloakService) {
    this.userdetails = this.KeycloakService.getCurrentUserDetails();
    // localStorage.setItem('userName', this.userdetails.name);
    // localStorage.setItem('roleInfo', this.userdetails.resource_access.account.roles);
  }


  // Initial loading
  ngOnInit() {
  }

}
