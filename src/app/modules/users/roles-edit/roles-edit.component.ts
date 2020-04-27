import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
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
  // myForm: FormGroup;
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
  allRoles: any;
  ids: any;
  selectedRows: any;
  finalOutput: any;
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(@Inject(MAT_DIALOG_DATA) public rolesData: any,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RolesEditComponent>) {
    this.allRoles = this.rolesData[0]['roles'];
    this.roles = this.rolesData[1]['roles'];

  }

  ngOnInit() {
    this.data = this.rolesData[0];
    this.selecteddata = this.rolesData[1];

    const compareLabel = (obj1, obj2) => {
      return (obj1.label === obj2.label);
    }

    this.finalOutput = this.allRoles.filter(b => {
      let indexFound = this.roles.findIndex(a => compareLabel(a, b));
      return indexFound == -1;
    });

    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) => role ? this._filter(role) : this.finalOutput.slice()));
  }


  onDismiss() {
    this.roles = this.selecteddata.roles;
    // this.dialogRef.close();
  }
  onConfirm() {
    this._snackBar.open('Comming soon', 'Dismiss', {
      duration: 10000,
      verticalPosition: 'top'
    });
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.roles.push(value.trim());
    }

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
  }

  private _filter(value: any): string[] {
    if (typeof (value) == 'object') {
      this.filterValue = value.label.toLowerCase();
    } else {
      this.filterValue = value.toLowerCase();
    }
    return this.finalOutput.filter(role => role.label.toLowerCase().indexOf(this.filterValue) === 0);
  }

}
