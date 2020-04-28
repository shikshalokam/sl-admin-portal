import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, DoBootstrap, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, TranslateService, SharedModule } from 'shikshalokam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminCoreModule } from './modules/admin-core/admin-core.module';
import { keyCloakService } from './modules/admin-core';
import { AdminSharedModule } from './modules/admin-shared';
import { environment } from 'src/environments/environment';
import { KeycloakAngularModule } from 'keycloak-angular';
import { HomeComponent } from './home/home.component';
import { BreadCrumComponent } from './bread-crum/bread-crum.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // FooterComponent,
    LoginComponent,
    HomeComponent,
    BreadCrumComponent
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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
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
