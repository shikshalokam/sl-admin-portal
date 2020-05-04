import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSharedModule } from '../admin-shared';
import { OrganisationsRoutingModule } from './organisations-routing.module';
import { OrganisationsListComponent } from './organisations-list/organisations-list.component';

@NgModule({
  declarations: [OrganisationsListComponent],
  imports: [
    CommonModule,
    AdminSharedModule,
    OrganisationsRoutingModule
  ]
})
export class OrganisationsModule { }
