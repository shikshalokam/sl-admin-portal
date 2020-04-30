import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSharedModule, DynamicFormComponent } from '../admin-shared';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-single-user/add-single-user.component';
import { AddMultipleUsersComponent } from './add-multiple-users/add-multiple-users.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { CdkTableModule } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';




@NgModule({
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule,
    CdkTableModule,
    AdminSharedModule,
    UsersRoutingModule],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ DatePipe],
  entryComponents: [AddUserComponent, AddMultipleUsersComponent,RolesEditComponent],
  declarations: [UsersComponent, DynamicFormComponent, UsersListComponent, AddUserComponent, AddMultipleUsersComponent, UsersEditComponent,  RolesEditComponent],
})
export class UsersModule { }
