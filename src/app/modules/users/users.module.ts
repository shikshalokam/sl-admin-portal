import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MultiUsersComponent } from './multi-users/multi-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleUserComponent } from './single-user/single-user.component';
import { AdminSharedModule, DynamicFormComponent } from '../admin-shared';
import { UsersRoutingModule } from './users-routing.module';
import { DynamicFieldDirective } from '../admin-shared/components/dynamic-field/dynamic-field.directive';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';





@NgModule({
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule,
    AdminSharedModule,
    UsersRoutingModule],
    entryComponents:[AddUserComponent],
  declarations: [UsersComponent, DynamicFormComponent, DynamicFieldDirective, MultiUsersComponent, SingleUserComponent, UsersListComponent, AddUserComponent],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }
