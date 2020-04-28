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
      { path: 'users', component: UsersComponent,  pathMatch: 'full' },
      {
        path: 'list', component: UsersListComponent,
      },
      { path: 'edit/:id', component: UsersEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
