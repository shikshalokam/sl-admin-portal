import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users-service/users.service';
import { keyCloakService } from '../services/auth-service/auth.service';
import { CommonServiceService } from '../services/common-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationGuard implements CanActivate {
  promiseRowData: any;
  rolesArray: any;
  tokendetails: any;
  constructor(private usersService: UsersService, private route: Router,
    private keycloakService: keyCloakService, private commonServiceService: CommonServiceService) {

  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.promiseRowData = await this.usersService.getUserRoles();
    if (this.promiseRowData['result']) {
      this.rolesArray = this.promiseRowData['result'].roles;
    }
    this.tokendetails = this.keycloakService.sendToken();
    if (this.tokendetails.token && this.rolesArray.includes("PLATFORM_ADMIN")) {
      return true;
    } else {
      this.route.navigate(['/home']);
      this.commonServiceService.commonSnackBar('Unauthorized user', 'error', 'top', 1000)
      return false;
    }
  }
}
