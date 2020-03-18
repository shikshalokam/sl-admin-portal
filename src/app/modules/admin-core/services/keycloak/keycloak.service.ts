// import { Injectable, Injector } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Router } from '@angular/router';


// declare var Keycloak: any;

// @Injectable({
//   providedIn: 'root'
// })
// export class KeyCloakService {
//   public jwtHelper: JwtHelperService = new JwtHelperService();
//   isLoggedIn = false;
//   redirectUrl: string;
//   userName: string;
//   private get _router() { return this._injector.get(Router); }
//   constructor(private _injector: Injector) { }


//   private keycloakAuth: any;

//   init(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const config = {
//         'url': environment.keycloak.url,
//         'realm': environment.keycloak.realm,
//         'clientId': environment.keycloak.clientId
//       };
//       this.keycloakAuth = new Keycloak(config);
//       this.keycloakAuth.init({
//         onLoad: 'login-required',
//         checkLoginIframe: true,
//         enableBearerInterceptor: true
//       })
//         .success(() => {
//           //console.log("seting")
//           localStorage.setItem('auth-token', this.keycloakAuth.token)
//           //   localStorage.setItem('downloadReport-token',environment.downloadReportHeaderValue)

//           resolve();
//         })
//         .error(() => {
//           reject();
//         });
//     });
//   }

//   getToken(): string {
//     return this.keycloakAuth.token;
//   }

//   getCurrentUserDetails() {
//     // //console.log(jwt_decode(this.keycloakAuth.token).name)
//     // this.userName = jwt_decode(this.keycloakAuth.token).name;
//     // return jwt_decode(this.keycloakAuth.token);
//     this.userName = this.jwtHelper.decodeToken(this.getToken()).name;
//     return this.jwtHelper.decodeToken(this.getToken());
//   }

//   logout() {
//     this._router.navigate(['/users']);
//     localStorage.clear();
//     return this.keycloakAuth.logout();
//   }

//   getLogin() {
//     return this.keycloakAuth.logout();
//   }



// }
