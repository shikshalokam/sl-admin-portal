import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommingSoonComponent, UnauthorizedComponent } from './modules/admin-shared';
import { HomeComponent } from './home/home.component';
import { UsersGuard, RouteGuard } from './modules/admin-core';




const routes: Routes = [
  {
    path: 'users',
    canActivate: [UsersGuard],
    loadChildren: './modules/users/users.module#UsersModule'
  },
  {
    path: 'organisations',
    canActivate: [RouteGuard],
    loadChildren: './modules/organisations/organisations.module#OrganisationsModule'
  },
  { path: 'home', component: HomeComponent, data: { title: [{name: 'Admin Console', link: '/home'}]} },
  { path: 'unauthorized', component: UnauthorizedComponent, data: { title: 'Unauthorized User' } },
  {
    path: 'comming-soon', component: CommingSoonComponent, data: { title: 'Comming soon' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
