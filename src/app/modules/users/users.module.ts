import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MultiUsersComponent } from './multi-users/multi-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleUserComponent } from './single-user/single-user.component';
import { AdminSharedModule, DynamicFormComponent } from '../admin-shared';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddMultipleUsersComponent } from './add-multiple-users/add-multiple-users.component';
// import { FileSaverModule } from 'ngx-filesaver';





@NgModule({
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule,
    AdminSharedModule,
    // FileSaverModule,
    UsersRoutingModule],
  entryComponents: [AddUserComponent, AddMultipleUsersComponent],
  declarations: [UsersComponent, DynamicFormComponent, MultiUsersComponent, SingleUserComponent, UsersListComponent, AddUserComponent, AddMultipleUsersComponent],
})
export class UsersModule { }
