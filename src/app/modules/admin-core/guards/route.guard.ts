import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users-service/users.service';
import { keyCloakService } from '../services/auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  promiseRowData: any;
  rolesArray: any;
  tokendetails: any;
  constructor(private usersService: UsersService, private route: Router,
    private keycloakService: keyCloakService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.promiseRowData = this.usersService.getUserRoles();
    if (this.promiseRowData['result']) {
      this.rolesArray = this.promiseRowData['result'].roles;
    }
    this.tokendetails = this.keycloakService.sendToken();
    console.log('rrrrrrrrrrrrr', this.tokendetails);
    if (this.tokendetails.token) {
      return true;
    } else {
      this.route.navigate(['/unauthorized'])
      return false;
    }



  }
}
