import { Component, OnInit } from '@angular/core';
import { UsersService, keyCloakService } from '../..';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UnauthorizedComponent } from '../../../admin-shared';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../../services/common-service.service';


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
    private router: Router, private route: ActivatedRoute,
    private commonServiceService: CommonServiceService) { }

  async ngOnInit() {
    this.promiseRowData = await this.usersService.getUserRoles().catch(e => {
      // this.KeycloakService.logout();
      // this.unAuthoriseduser();
    });
    if (this.promiseRowData['result']) {
      this.rolesArray = this.promiseRowData['result'].roles;
      this.response = false;
    } else {
      this.response = false;
      const msg  = `Something went wrong,Please relogin`
      this.openDialog(msg);
    }

    if (this.promiseRowData['result'] && (this.rolesArray.includes("ORG_ADMIN") || this.rolesArray.includes("PLATFORM_ADMIN"))) {
      this.admin = true;
      this.response = false
    } else {
      this.admin = false;
      this.response = false
      const msg = `You don't have right to access this site.`;
      this.openDialog(msg);
    }
  }


  openDialog(message): void {
    const dialogRef = this.dialog.open(UnauthorizedComponent
      , {
        disableClose: true,
        data: { message }
      });

    dialogRef.afterClosed().subscribe(result => {
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
      "routerlink": "/uploadrecords/list",
      "icon": "cloud_upload",
      "title": "Uploads",
      "data": "View Upload Files"
    }
  ]

  // To Redirect the page
  pageReDirect(data) {
    if (data === '/home') {
      this._snackBar.open('Comming soon', 'Dismiss', {
        duration: 10000,
        verticalPosition: 'top'
      });
    } else {
      this.router.navigateByUrl(data);
    }

  }

  unAuthoriseduser() {
    this.commonServiceService.commonSnackBar('unauthorised user', 'Dismiss', 'top', 10000);
  }
}
