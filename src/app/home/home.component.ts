import { Component, OnInit } from '@angular/core';
import { UsersService, keyCloakService } from '../modules/admin-core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UnauthorizedComponent } from '../modules/admin-shared';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  promiseRowData: any;
  admin: boolean = false;
  rolesArray: any;
  response: boolean = true;
  constructor(private usersService: UsersService, public dialog: MatDialog,
    private KeycloakService: keyCloakService, private _snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.promiseRowData = await this.usersService.getUserRoles();
    if (this.promiseRowData['result']) {
      this.rolesArray = this.promiseRowData['result'].roles;
    }
    console.log(' this.rolesArray', this.rolesArray);
    if (this.promiseRowData['result'] && (this.rolesArray.includes("ORG_ADMIN") || this.rolesArray.includes("PLATFORM_ADMIN"))) {
      this.admin = true;
      this.response = false
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
        // width: '25%',
        // height: '20%',
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.KeycloakService.logout();
    });
  }

  homedisplayArray = [
    {
      "routerlink": "/home",
      "icon": "dashboard",
      "title": "Dashboard",
      "data": "See Relevant data of organisation"
    },
    {
      "routerlink": "/users/list",
      "icon": "person",
      "title": "Users",
      "data": "Add or Manage Users"
    },
    {
      "routerlink": "/organisations/list",
      "icon": "account_balance",
      "title": "Organisations",
      "data": "Add or Manage Organisations"
    },
    {
      "routerlink": "/home",
      "icon": "assessment",
      "title": "Reports",
      "data": "Add or Manage Reports"
    }
  ]

  // To Redirect the page
  pageReDirect(data) {
    if (data === '/home') {
      this._snackBar.open('Comming soon', 'Dismiss', {
        duration: 10000,
        verticalPosition: 'top'
      });
    }
    // else if (this.rolesArray.includes("PLATFORM_ADMIN")) {
    //   this.router.navigateByUrl(data);
    // }
    else {
      this.router.navigateByUrl(data);
    }

  }
}
