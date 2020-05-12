import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSharedModule } from '../admin-shared';
import { OrganisationsRoutingModule } from './organisations-routing.module';
import { OrganisationsListComponent } from './organisations-list/organisations-list.component';
import { CreateandEditOrganisationComponent } from './createandEdit-organisation/createandEdit-organisation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { OrganisationEditComponent } from './organisation-edit/organisation-edit.component';

@NgModule({
  declarations: [OrganisationsListComponent, CreateandEditOrganisationComponent, OrganisationEditComponent],
  imports: [
    CommonModule,
    AdminSharedModule,
    CdkTableModule,
    OrganisationsRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  entryComponents:[CreateandEditOrganisationComponent]
})
export class OrganisationsModule { }
