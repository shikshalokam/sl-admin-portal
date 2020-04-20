import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Home' },
    children: [
      { path: 'users', component: UsersComponent, data: { title: 'users Home' }, pathMatch: 'full' },
      {
        path: 'users-list', component: UsersListComponent
      },
      { path: 'users-edit', component: UsersEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
