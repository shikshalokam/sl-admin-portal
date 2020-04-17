import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CommonServiceService } from '../common-service.service';


declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})

export class keyCloakService {
  isLoggedIn = false;
  redirectUrl: string;
  userName: string;
  constructor(private jwtHelper: JwtHelperService, private router: Router,
    private commonServiceService: CommonServiceService
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
    console.log('================', tokendetails);
    this.commonServiceService.setUserDetails(tokendetails.profile);
  }
  instanceLogin() {
    this.keycloak.login().then(successs => {
      console.log("successs")
    }).catch(error => {
      console.log("errorrrr")
    })
  }
  newMessage() {
    this.commonServiceService.nextMessage("Second Message")
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
    // environment.base_url + '/home'
    this.keycloak.logout('https://devhome.shikshalokam.org/admin-portal/home');
    localStorage.clear();
  }

  getLogin() {
    this.keycloakAuth.login();
  }

}
