import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSharedModule } from '../admin-shared';
import { OrganisationsRoutingModule } from './organisations-routing.module';
import { OrganisationsListComponent } from './organisations-list/organisations-list.component';
import { CreateOrganisationComponent } from './create-organisation/create-organisation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { OrganisationEditComponent } from './organisation-edit/organisation-edit.component';

@NgModule({
  declarations: [OrganisationsListComponent, CreateOrganisationComponent, OrganisationEditComponent],
  imports: [
    CommonModule,
    AdminSharedModule,
    CdkTableModule,
    OrganisationsRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  entryComponents:[CreateOrganisationComponent]
})
export class OrganisationsModule { }
