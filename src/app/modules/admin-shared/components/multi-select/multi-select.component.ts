import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;
  finaldata: any;
  serverName: any;
  selectedUsers: any = [];
  filteredOptions: Observable<any[]>;
  constructor() { }
  ngOnInit() {
    this.finaldata = this.field.options;
    this.filteredOptions = this.group.get(this.field.field)!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  OnInput(event: any) {
    this.serverName = event.target.value;
    this.finaldata = this._filter(this.serverName);
  }

  private _filter(value: any) {
    const filterValue = value.toLowerCase();
    return this.field.options.filter(option => option.label.toLowerCase().indexOf(filterValue) === 0);
  }

 // To return back the data to view
  displayFn(value): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((user, index) => {
        if (index === 0) {
          displayValue = user.label;
        } else {
          displayValue += ', ' + user.label;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  // To select the data 
  optionClicked(event: Event, user) {
    event.stopPropagation();
    this.toggleSelection(user);
  }

  // checkbox selection 
  toggleSelection(user) {
    user.selected = !user.selected;
    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      const i = this.selectedUsers.findIndex(value => value.label === user.label && value.value === user.value);
      this.selectedUsers.splice(i, 1);
    }
    this.group.controls.roles.setValue(this.selectedUsers);
  }

}

