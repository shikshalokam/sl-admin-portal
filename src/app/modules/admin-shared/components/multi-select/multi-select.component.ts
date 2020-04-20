// import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { ReplaySubject, Subject } from 'rxjs';
import { Component, ElementRef, ViewChild, OnInit, Input, QueryList, ViewChildren } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent } from '@angular/material';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;
  finaldata: any;
  public roleMultiFilterCtrl: FormControl = new FormControl();
  constructor() { }
  ngOnInit() {
    this.finaldata = this.field.options;
    this.roleMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.finaldata = this.filterRolesMulti();

      });
  }

  protected filterRolesMulti() {
    const filterValue = this.roleMultiFilterCtrl.value.toLowerCase();
    return this.field.options.filter(option => option.label.toLowerCase().includes(filterValue));

  }

  protected _onDestroy = new Subject<void>();


}

