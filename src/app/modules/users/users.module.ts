import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSharedModule, DynamicFormComponent } from '../admin-shared';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-single-user/add-single-user.component';
import { AddMultipleUsersComponent } from './add-multiple-users/add-multiple-users.component';





@NgModule({
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule,
    AdminSharedModule,
    UsersRoutingModule],
  entryComponents: [AddUserComponent, AddMultipleUsersComponent],
  declarations: [UsersComponent, DynamicFormComponent, UsersListComponent, AddUserComponent, AddMultipleUsersComponent],
})
export class UsersModule { }
