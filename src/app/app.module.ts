import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, DoBootstrap, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, TranslateService, SharedModule } from 'shikshalokam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminCoreModule } from './modules/admin-core/admin-core.module';
import { keyCloakService } from './modules/admin-core';
import { AdminSharedModule } from './modules/admin-shared';
import { environment } from 'src/environments/environment';
import { KeycloakAngularModule } from 'keycloak-angular';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AdminSharedModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    CoreModule.forRoot(),
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    AdminCoreModule,
  ],
  entryComponents:[
    AppComponent
  ],
  providers: [TranslateService,
    keyCloakService
  ],
})
export class AppModule implements DoBootstrap {

  constructor(private auth: keyCloakService) { }

  ngDoBootstrap(appRef: ApplicationRef) {
    this.auth.initilizeKeycloak({
      config: {
        'url': environment.keycloak.url,
        'realm': environment.keycloak.realm,
        'clientId': environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
    }).then(success => {
      appRef.bootstrap(AppComponent);
    }).catch(error => {
    })
  }
}
