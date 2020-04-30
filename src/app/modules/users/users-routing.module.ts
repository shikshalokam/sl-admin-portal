import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';


const routes: Routes = [
  {
    path: '',
    // data: { title: 'Home' },
    children: [
      {
        path: 'list', component: UsersListComponent, data: { title: [{ name: 'Home >', link: '/home' }, { name: 'Users', link: '/users/list' }] },
      },
      { path: 'edit/:id', component: UsersEditComponent, data: { title: [{ name: 'Home', link: '/home' }, { name: 'Users', link: '/users/list' }] } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
