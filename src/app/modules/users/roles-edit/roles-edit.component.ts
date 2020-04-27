import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';


@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {
  myForm: FormGroup;
  roleFormArray: any;
  selecteddata: any;
  data: any;

  visible = true;
  selectable = true;
  removable = true;
  filterValue: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  roles: any;
  allFruits: any;
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(@Inject(MAT_DIALOG_DATA) public rolesData: any,
    private fb: FormBuilder, public dialogRef: MatDialogRef<RolesEditComponent>) {
    this.allFruits = this.rolesData[0]['roles'];
    this.roles = this.rolesData[1]['roles'];
    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit() {
    this.data = this.rolesData[0];
    this.selecteddata = this.rolesData[1];
    this.myForm = this.fb.group({
      userrole: this.fb.array([])
    });
    console.log('------rolesData------', this.rolesData);

  }

  onChange(role: string, isChecked) {
    this.roleFormArray = <FormArray>this.myForm.controls.userrole;

    if (isChecked) {
      this.roleFormArray.push(new FormControl(role));
    } else {
      let index = this.roleFormArray.controls.findIndex(x => x.value == role)
      this.roleFormArray.removeAt(index);
    }
  }
  onDismiss() {
    this.dialogRef.close();
  }
  onConfirm() {
    console.log('yyyyyyyyyy', this.roleFormArray, this.roles);

  }

  // ----------------------------------------------------------------------------------

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.roles.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.roleCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.roles.indexOf(fruit);

    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected', event);
    
    this.roles.push(event.option.value);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  private _filter(value: any): string[] {
    console.log('_filter', value)
    if (typeof (value) == 'object') {
      this.filterValue = value.label.toLowerCase();
    } else {
      this.filterValue = value.toLowerCase();
    }
    // const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.label.toLowerCase().indexOf(this.filterValue) === 0);
  }

}
