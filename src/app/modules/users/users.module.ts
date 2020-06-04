import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSharedModule } from '../admin-shared';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-single-user/add-single-user.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { CdkTableModule } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';
import { AddOrganisationComponent } from './add-organisation/add-organisation.component';
import { AddMultipleUsersComponent } from './add-multiple-users/add-multiple-users.component';
import { UploadConfirmationComponent } from './upload-confirmation/upload-confirmation.component';
import { AdminCoreModule } from '../admin-core';


@NgModule({
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule,
    CdkTableModule,
    AdminCoreModule,
    AdminSharedModule,
    UsersRoutingModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [DatePipe],
  entryComponents: [AddUserComponent, AddOrganisationComponent, RolesEditComponent, UploadConfirmationComponent, AddMultipleUsersComponent],
  declarations: [AddOrganisationComponent, UsersListComponent, AddUserComponent, UsersEditComponent,
    RolesEditComponent, AddOrganisationComponent, AddMultipleUsersComponent, UploadConfirmationComponent],
})
export class UsersModule { }
