import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users-service/users.service';
import { keyCloakService } from '../services/auth-service/auth.service';
import { CommonServiceService } from '../services/common-service.service';
import { UnauthorizedComponent } from '../../admin-shared';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  promiseRowData: any;
  rolesArray: any;
  tokendetails: any;
  constructor(private usersService: UsersService, private route: Router,
    private keycloakService: keyCloakService, private commonServiceService: CommonServiceService,
    private dialog: MatDialog) {

  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.promiseRowData = await this.usersService.getUserRoles();
    if (this.promiseRowData['result']) {
      this.rolesArray = this.promiseRowData['result'].roles;
    }
    this.tokendetails = this.keycloakService.sendToken();
    if (this.rolesArray.includes("PLATFORM_ADMIN") || this.rolesArray.includes("ORG_ADMIN")) {
      return true;
    } else {
      this.openDialog();
      return false;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UnauthorizedComponent
      , {
        disableClose: true,
         data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.keycloakService.logout();
    });
  }

}
