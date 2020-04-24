import { Component, ViewChild, OnInit, Input ,ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-organisation-roles',
  templateUrl: './organisation-roles.component.html',
  styleUrls: ['./organisation-roles.component.scss']
})
export class OrganisationRolesComponent implements OnInit {
  @Input() userData: any;
  visible = true;
  selectable = true;
  removable = true;
  load: boolean = false;
  makedisable: boolean = true;
  // separatorKeysCodes: number[] = [ENTER, COMMA];
  roleCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  roles: string[] = [];
  filterValue: any;
  userId: any;
  makeEnable: boolean = true;
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor() { }

  ngOnInit() {
    console.log('OrganisationRolesComponent', this.userData);
    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) => role ? this._filter(role) : this.userData.roles.slice()));
    
  }

  private _filter(value) {
    if (typeof (value) == 'object') {
      this.filterValue = value.label.toLowerCase();
    } else {
      this.filterValue = value.toLowerCase();
    }

    return this.userData.roles.filter(role => role.label.toLowerCase().indexOf(this.filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our role
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
    console.log('seeeeeee', event);
    this.roles.push(event.option.value);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

}
