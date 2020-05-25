import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadCSVRoutingModule } from './upload-csv-routing.module';
import { UsersCsvComponent } from './users-csv/users-csv.component';
import { AdminSharedModule } from '../admin-shared';

@NgModule({
  declarations: [UsersCsvComponent],
  imports: [
    CommonModule,
    AdminSharedModule,  
    UploadCSVRoutingModule
  ]
})
export class UploadCSVModule { }
