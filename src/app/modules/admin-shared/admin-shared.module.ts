import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {
  MatMenuModule, MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule,
  MatTabsModule, MatSnackBarModule, MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
// import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
// import { DateComponent } from './components/date/date.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';




@NgModule({
  // ButtonComponent
  declarations: [CommingSoonComponent, DynamicFieldDirective, UnauthorizedComponent, 
    InputComponent, SelectComponent, RadiobuttonComponent, CheckboxComponent,MultiSelectComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule, MatSnackBarModule, MatButtonModule, MatIconModule, MatTabsModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  exports: [MatMenuModule,
    MatToolbarModule,
    MatCardModule, MatButtonModule, MatIconModule, MatTabsModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    DynamicFieldDirective,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatRadioModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    InputComponent,
    // ButtonComponent,
    SelectComponent,
    // DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    MultiSelectComponent
  ]
})
export class AdminSharedModule { }
