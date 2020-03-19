import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {
  MatMenuModule, MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule,
  MatTabsModule, MatSnackBarModule
} from '@angular/material';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form/main-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CommingSoonComponent, DynamicFormQuestionComponent, DynamicFormComponent, UnauthorizedComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule, MatSnackBarModule, MatButtonModule, MatIconModule, MatTabsModule
  ],
  exports: [MatMenuModule,
    MatToolbarModule,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    MatCardModule, MatButtonModule, MatIconModule, MatTabsModule]
})
export class AdminSharedModule { }
