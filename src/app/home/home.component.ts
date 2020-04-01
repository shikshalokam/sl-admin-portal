import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  singleuser() {
  }

  homedisplayArray = [
    {
      "routerlink": "/comming-soon",
      "icon": "dashboard",
      "title": "Dashboard",
      "data": "See Relevant data of organisation"
    },
    {
      "routerlink": "/users/users-list",
      "icon": "person",
      "title": "Users",
      "data": "Add or Manage Users"
    },
    {
      "routerlink": "/comming-soon",
      "icon": "account_balance",
      "title": "Organisations",
      "data": "Add or Manage Organisations"
    },
    {
      "routerlink": "/comming-soon",
      "icon": "assessment",
      "title": "Reports",
      "data": "Add or Manage Reports"
    }
  ]

}
