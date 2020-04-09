import { Component, OnInit } from '@angular/core';
import { UsersService, keyCloakService } from '../modules/admin-core';
import { MatDialog } from '@angular/material';
import { UnauthorizedComponent } from '../modules/admin-shared';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  promiseRowData: any;
  admin: boolean = false;
  constructor(private usersService: UsersService, public dialog: MatDialog,
    private KeycloakService: keyCloakService, ) { }

  async ngOnInit() {
    this.promiseRowData = await this.usersService.loadAccountList();
    if(this.promiseRowData['result'].roles.includes("ORG_ADMIN" || "ADMIN")){
      this.admin = true;
    } else {
      this.admin = false;
      this.openDialog();
    }
  }

  singleuser() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UnauthorizedComponent
      , {
        disableClose: true,
        width: '25%',
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.KeycloakService.logout();
    });
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
