import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { keyCloakService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {
  constructor(private keyCloakService: keyCloakService,
    private router: Router) {

  }
  url;
   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userLoggedIn = this.keyCloakService.isUserLoggedIn();
    let allowedArray = [];
    let url: string = state.url;
    this.url = state.url;
    if (!localStorage.getItem("roleInfo")) {
      // let res = await this.keyCloakService.getUserRoles();
    }
    allowedArray = this.keyCloakService.getAllowedUrls();

    if (allowedArray.includes(this.url)) {
      return true;
    } else {
      return false;

    }
    // if (userLoggedIn) {
    //   return (true)
    // } else {
    //   this.keyCloakService.instanceLogin()
    //   return false
    // }
  }

  canActivate1(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.keyCloakService.isUserLoggedIn();
    if (currentUser) {
        // check if route is restricted by role
        // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        //     // role not authorised so redirect to home page
        //     this.router.navigate(['/']);
        //     return false;
        // }

        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
}
}
