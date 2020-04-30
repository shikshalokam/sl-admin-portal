import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatChipInputEvent,  } from '@angular/material/chips';
import { FormGroup, FormBuilder,FormControl, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.scss']
})
export class AddOrganisationComponent implements OnInit {
  finalOutput: any;
  serverName: any;
  finalData: any;
  myForm: FormGroup;
  roles: any = [];
  selectable = true;
  removable = true;
  filteredRoles: Observable<string[]>;
  roleCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocomplete1: MatAutocomplete;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(@Inject(MAT_DIALOG_DATA) public organisationData: any,
    public dialogRef: MatDialogRef<AddOrganisationComponent>,
    public fb: FormBuilder) { }

  ngOnInit() {
    console.log('AddOrganisationComponent', this.organisationData);
    this.filteringData();
    this.reactiveForm();


    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) => role ? this._filter1(role) : this.organisationData.roles.slice()));
  }

  onCancel() {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // if ((value || '').trim()) {
    //   this.roles.push(value.trim());
    // }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.roleCtrl.setValue(null);
  }

  remove(role: string): void {
    const index = this.roles.indexOf(role);
    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.value);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
    this.filteringData();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      organisation: ['',[Validators.required]],
      roles: [this.roles, [Validators.required]],
    })
  }

  submitForm() {
    console.log('onConfirm', this.myForm.value);
  }
   /* Handle form errors in Angular 8 */
   public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }


  // Remove the selected object
  filteringData() {
    const compareLabel = (obj1, obj2) => {
      return (obj1.value === obj2.value);
    }

    this.finalOutput = this.organisationData.organisationsList.filter(b => {
      let indexFound = this.organisationData.organisations.findIndex(a => compareLabel(a, b));
      return indexFound == -1;
    });
    this.finalData = this.finalOutput;

    console.log('finalOutput', this.finalData);

    // this.filteredRoles = this.roleCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((role: string | null) => role ? this._filter(role) : this.finalOutput.slice()));
  }

  OnInput(event: any) {
    this.serverName = event.target.value;
    console.log('OnInput', this.serverName);
    if (this.serverName) {
      this.finalData = this._filter(this.serverName);
    } else {
      this.finalData = this.finalOutput;
    }
  }

  private _filter(value: any) {
    console.log('_filter', value);
    const filterValue = value.toLowerCase();
    return this.finalOutput.filter(option => option.label.toLowerCase().indexOf(filterValue) === 0);
  }


  private _filter1(value: any) {
    console.log('_filter1', value);
    const filterValue = value.toLowerCase();
    return this.organisationData.roles.filter(option => option.label.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(user): string {
    return user && user.label ? user.label : user;
  }

}
