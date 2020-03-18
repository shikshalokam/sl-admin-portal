import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommingSoonComponent, UnauthorizedComponent } from './modules/admin-shared';
import { PrivateGuard } from './modules/admin-core';





const routes: Routes = [
  {
    path: '',
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
