import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadStatusRoutingModule } from './upload-status-routing.module';
import { UsersCsvComponent } from './users-csv/users-csv.component';
import { AdminSharedModule } from '../admin-shared';

@NgModule({
  declarations: [UsersCsvComponent],
  imports: [
    CommonModule,
    AdminSharedModule,
    UploadStatusRoutingModule
  ]
})
export class UploadStatusModule { }
