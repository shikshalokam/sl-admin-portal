import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesRoutingModule } from './entities-routing.module';
import { StateEntityListComponent } from './state-entity-list/state-entity-list.component';
import { CdkTableModule } from '@angular/cdk/table';
import { AdminSharedModule } from '../admin-shared';
import { ViewEntityDetailsComponent } from './view-entity-details/view-entity-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewSubEntityDetailsComponent } from './view-sub-entity-details/view-sub-entity-details.component';
import { BulkUploadEntitiesComponent } from './bulk-upload-entities/bulk-upload-entities.component';
import { BulkEntityMappingComponent } from './bulk-entity-mapping/bulk-entity-mapping.component';


@NgModule({
  declarations: [StateEntityListComponent, ViewEntityDetailsComponent, ViewSubEntityDetailsComponent, BulkUploadEntitiesComponent, BulkEntityMappingComponent],
  imports: [
    CommonModule,
    AdminSharedModule,
    CdkTableModule,
    ReactiveFormsModule,
    FormsModule,
    EntitiesRoutingModule
  ],
  entryComponents: [ViewSubEntityDetailsComponent, BulkUploadEntitiesComponent, BulkEntityMappingComponent]
})
export class EntitiesModule { }
