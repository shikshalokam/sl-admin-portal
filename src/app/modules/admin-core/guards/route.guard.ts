import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users-service/users.service';



@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private usersService: UsersService, private route: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.usersService.roles) {
      // if(admin === 'OBS_DESIGNER'){
        // return true;
      // }
      return true;
    } else {
      this.route.navigate(['/unauthorized'])
      return false;
    }



  }
}
