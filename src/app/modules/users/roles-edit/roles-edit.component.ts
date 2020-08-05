import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { UsersService } from '../../admin-core';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../../admin-core/services/common-service.service';

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {
  roleFormArray: any;
  selecteddata: any;
  data: any;
  selectable = true;
  removable = true;
  filterValue: any;
  roleCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  roles: any;
  allRoles: any;
  userId: any;
  roleValues: any = [];
  finalOutput: any;
  updateResponse: any;
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(@Inject(MAT_DIALOG_DATA) public rolesData: any,
    private _snackBar: MatSnackBar,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private commonServiceService: CommonServiceService,
    public dialogRef: MatDialogRef<RolesEditComponent>) {
    this.allRoles = this.rolesData[0]['roles'];
    this.roles = this.rolesData[1]['roles'];
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.data = this.rolesData[0];
    this.selecteddata = this.rolesData[1];
    this.filteringData();
  }


  onConfirm() {
    console.log('confirm', this.roles)
    this.dialogRef.close(true);
    this.updateRoles();
  }

  // update existing roles
  updateRoles() {

    this.roles.forEach(element => {
      this.roleValues.push(element.value);
    });
    let data = {
      userId: this.rolesData[0]['userId'],
      organisationId: this.rolesData[1]['value'],
      roles: this.roleValues
    }
    this.usersService.updateRoles(data).subscribe(data => {
      console.log('role sucess', data);
      this.updateResponse = data;
      this.dialogRef.close(true);
      this.commonServiceService.commonSnackBar(this.updateResponse.message, 'success', 'top', 1000)

    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    })
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
    this.filteringData();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.value);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
    this.filteringData();
  }

  private _filter(value: any): string[] {
    if (typeof (value) == 'object') {
      this.filterValue = value.label.toLowerCase();
    } else {
      this.filterValue = value.toLowerCase();
    }
    return this.finalOutput.filter(role => role.label.toLowerCase().indexOf(this.filterValue) === 0);
  }


  // Remove the selected object
  filteringData() {
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

}
