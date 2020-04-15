import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users-service/users.service';



@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  promiseRowData: any;
  rolesArray: any;
  constructor(private usersService: UsersService, private route: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.promiseRowData = this.usersService.getUserRoles();
    if (this.promiseRowData['result']) {
      this.rolesArray = this.promiseRowData['result'].roles;
    }
    if (localStorage.getItem('access-token')) {
    // if (this.promiseRowData['result'] && (this.rolesArray.includes("ORG_ADMIN") || this.rolesArray.includes("PLATFORM_ADMIN"))) {
      // if(localStorage.getItem('user_role') === 'ORG_ADMIN'){
      //   return true;
      // } else {
      //   this.route.navigate(['/unauthorized'])
      // }
      return true;
    } else {
      this.route.navigate(['/unauthorized'])
      return false;
    }



  }
}
