import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommingSoonComponent, UnauthorizedComponent } from './modules/admin-shared';
import { RouteGuard } from './modules/admin-core/guards/route.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    loadChildren: './modules/users/users.module#UsersModule',
  },
  { path: 'home', component: CommingSoonComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
