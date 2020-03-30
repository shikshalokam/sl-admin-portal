import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { MultiUsersComponent } from './multi-users/multi-users.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { UsersListComponent } from './users-list/users-list.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Home' },
    children: [
      { path: 'users', component: UsersComponent, data: { title: 'users Home' }, pathMatch: 'full' },
      { path: 'multi-users', component: MultiUsersComponent, data: { title: 'multiusers' }, pathMatch: 'full' },
      { path: 'single-user', component: SingleUserComponent, pathMatch: 'full' },
      {
        path: 'users-list', component: UsersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
