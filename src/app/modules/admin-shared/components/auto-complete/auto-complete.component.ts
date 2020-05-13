import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControl, NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { FieldConfig } from "../../field.interface";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from "@angular/material";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  finaldata: any;
  serverName: any;
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor() { }

  ngOnInit() {
    this.finaldata = this.field.options;
  }

  OnInput(event: any) {
    this.serverName = event.target.value;
    this.finaldata = this._filter(this.serverName);
  }

  private _filter(value: any) {
    const filterValue = value.toLowerCase();
    return this.field.options.filter(option => option.label.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(user): string {
    return user && user.label ? user.label : user;
  }

}
