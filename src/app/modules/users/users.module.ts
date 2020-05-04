import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AddOrganisationComponent } from './add-organisation/add-organisation.component';




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
  entryComponents: [AddUserComponent,AddOrganisationComponent, AddMultipleUsersComponent,RolesEditComponent],
  declarations: [DynamicFormComponent, AddOrganisationComponent, UsersListComponent, AddUserComponent, AddMultipleUsersComponent, UsersEditComponent,  RolesEditComponent, AddOrganisationComponent],
})
export class UsersModule { }
