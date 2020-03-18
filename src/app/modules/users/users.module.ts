import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MultiUsersComponent } from './multi-users/multi-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleUserComponent } from './single-user/single-user.component';
import { AdminSharedModule } from '../admin-shared';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule,
    AdminSharedModule,
    UsersRoutingModule],
  declarations: [UsersComponent, MultiUsersComponent, SingleUserComponent],
})
export class UsersModule { }
