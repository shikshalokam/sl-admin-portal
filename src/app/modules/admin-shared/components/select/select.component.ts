import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: "app-select",
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  myControl = new FormControl();
  field: FieldConfig;
  group: FormGroup;
  finaldata: any;
  constructor() { }
  ngOnInit() {
    console.log('group', this.group);
    this.finaldata = this.group.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    console.log('sssssssssssss', this.finaldata)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.field.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}