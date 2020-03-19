import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})

export class keyCloakService {
  isLoggedIn = false;
  redirectUrl: string;
  userName: string;
  constructor(private jwtHelper: JwtHelperService, private router: Router
  ) { }


  private keycloakAuth: any;
  public keycloakInstance;
  keycloak = new KeycloakService();


  initilizeKeycloak(config): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloak.init(config).then(success => {
        resolve(config)
      }).catch(error => {
        reject(error)
      })
    })
  }

  isUserLoggedIn() {
    return (this.keycloak && this.keycloak['_instance'].token) ? true : false
  }


  setToken() {
    const tokendetails = this.keycloak.getKeycloakInstance();
    localStorage.setItem('access-token', tokendetails.token);
    localStorage.setItem('userdetails', JSON.stringify(tokendetails.profile));
    console.log('================', tokendetails);
  }
  instanceLogin() {
    this.keycloak.login().then(successs => {
      console.log("successs")
    }).catch(error => {
      console.log("errorrrr")
    })
  }

  getToken(): string {
    const accessToken = localStorage.getItem('auth-token');
    console.log(accessToken)
    return accessToken ? accessToken : null;
  }


  getCurrentUserDetails1() {
    // //console.log(jwt_decode(this.keycloakAuth.token).name)
    // this.userName = jwt_decode(this.keycloakAuth.token).name;
    // return jwt_decode(this.keycloakAuth.token);
    this.userName = this.jwtHelper.decodeToken(this.getToken()).name;
    return this.jwtHelper.decodeToken(this.getToken());
  }

  getCurrentUserDetails() {
    // console.log(jwt_decode(this.keycloakAuth.token).name)
    // this.userName = jwt_decode(this.keycloakAuth.token).name;
    // return jwt_decode(this.keycloakAuth.token);
    this.keycloak.isLoggedIn().then(
      isLogged => {
        if (isLogged) {
          return this.keycloak.getUsername();
        }
      }
    )
    console.log(this.getToken())
    this.userName = this.getToken() ? this.jwtHelper.decodeToken(this.getToken()).name : '';

    return null
  }

  getLogout() {

    localStorage.clear();
    return this.keycloakAuth.logout();
  }
  logout() {
    this.keycloak.logout('http://localhost:4200/users');
    localStorage.clear();
  }

  getLogin() {
    this.keycloakAuth.login();
  }

  /**
   * Restricting the urls based on the user role
   * @returns {Array} - Response data.
   */
  getAllowedUrls() {
    if (localStorage.getItem("roleInfo")) {
      let roles = JSON.parse(localStorage.getItem("roleInfo"));
      let allowedArray = [];
      roles.roles.forEach(element => {
        if (element == environment.platform_admin) {
          allowedArray.push("/single-user");
          allowedArray.push("/multiple-user");
          allowedArray.push('/create-organisation');
          allowedArray.push('/create-roles');
        } else if (element == environment.organisation_admin) {
          allowedArray.push("/single-user");
          allowedArray.push("/multiple-user");
        }
      });
      return allowedArray;
    } else {
      return [];
    }

  }

}
