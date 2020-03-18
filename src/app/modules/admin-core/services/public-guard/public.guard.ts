import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { keyCloakService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private keyCloakService: keyCloakService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userLoggedIn = this.keyCloakService.isUserLoggedIn();
    console.log('PublicGuard', userLoggedIn);
    if (!userLoggedIn) {
      return (true)
    } else {
      this.router.navigateByUrl('/user');
      return false
    }
  }
}
