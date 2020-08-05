import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatChipInputEvent, } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from '../../admin-core';
import { CommonServiceService } from '../../admin-core/services/common-service.service';
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
  filterValue: any;
  filteredRoles: Observable<string[]>;
  roleCtrl = new FormControl();
  addedRoles: any;
  roleValues: any = [];
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocomplete1: MatAutocomplete;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(@Inject(MAT_DIALOG_DATA) public organisationData: any,
    public dialogRef: MatDialogRef<AddOrganisationComponent>,
    public fb: FormBuilder, private usersService: UsersService,
    private commonServiceService: CommonServiceService) { }

  ngOnInit() {
     this.filteringOrganisationData();
    this.reactiveForm();
    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) => role ? this._filterRoles(role) : this.organisationData.roles.slice()));
  }

  onCancel() {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
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
    this.filteringRolesData();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.value);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
    this.filteringRolesData();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      organisation: ['', [Validators.required]],
      addRoles: [this.roles],
    })
  }

  submitForm() {
    if (this.myForm.valid) {
    this.addNewOrganisation(this.myForm.value);
    }

  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }


  // Remove the selected object
  filteringOrganisationData() {
    const compareLabel = (obj1, obj2) => {
      return (obj1.value === obj2.value);
    }

    this.finalOutput = this.organisationData.organisationsList.filter(b => {
      let indexFound = this.organisationData.organisations.findIndex(a => compareLabel(a, b));
      return indexFound == -1;
    });
    this.finalData = this.finalOutput;
  }

  filteringRolesData() {
    const compareLabel = (obj1, obj2) => {
      return (obj1.value === obj2.value);
    }

    this.finalOutput = this.organisationData.roles.filter(b => {
      let indexFound = this.roles.findIndex(a => compareLabel(a, b));
      return indexFound == -1;
    });
    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) => role ? this._filter(role) : this.finalOutput.slice()));
  }



  OnInput(event: any) {
    this.serverName = event.target.value;
    if (this.serverName) {
      this.finalData = this._filter(this.serverName);
    } else {
      this.finalData = this.finalOutput;
    }
  }

  private _filter(value: any) {
    if (typeof (value) == 'object') {
      this.filterValue = value.label.toLowerCase();
    } else {
      this.filterValue = value.toLowerCase();
    }
    return this.finalOutput.filter(option => option.label.toLowerCase().indexOf(this.filterValue) === 0);
  }


  private _filterRoles(value: any) {
    if (typeof (value) == 'object') {
      this.filterValue = value.label.toLowerCase();
    } else {
      this.filterValue = value.toLowerCase();
    }
    return this.organisationData.roles.filter(option => option.label.toLowerCase().indexOf(this.filterValue) === 0);
  }

  displayFn(user): string {
    return user && user.label ? user.label : user;
  }

  // Adding Roles to New organisation
  addNewOrganisation(orgData) {
    orgData.addRoles.forEach(element => {
      this.roleValues.push(element.value);
    });
    let data = {
      userId: this.organisationData.userId,
      organisation: orgData.organisation,
      roles: this.roleValues
    }
    this.usersService.addOrganisation_Roles(data).subscribe(data => {
      this.addedRoles = data;
      this.dialogRef.close(true);
      this.commonServiceService.commonSnackBar(this.addedRoles.message, 'success', 'top', 10000)
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    })
  }

}
