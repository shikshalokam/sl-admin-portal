import { Component, OnInit } from '@angular/core';
import { UsersService, keyCloakService } from '../modules/admin-core';
import { MatDialog, MatSnackBar} from '@angular/material';
import { UnauthorizedComponent } from '../modules/admin-shared';
import { Router } from '@angular/router';


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
    private KeycloakService: keyCloakService,private _snackBar: MatSnackBar,
    private router: Router) { }

  async ngOnInit() {
    this.promiseRowData = await this.usersService.getUserRoles();
    console.log('promiseRowData',this.promiseRowData);
    if(this.promiseRowData['result']) {
     this.rolesArray = this.promiseRowData['result'].roles;
    }
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
      "routerlink": "/home",
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
      "routerlink": "/home",
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
  wholeclick(data){
    if(data === '/home'){
      this._snackBar.open('Comming-soon', 'close', {
        duration: 2000,
      });
    } else {
      this.router.navigateByUrl('/users/users-list')
    }
   
  }
}
