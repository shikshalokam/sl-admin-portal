import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { FormControl } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: "app-select",
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  finaldata: any;
  filteredOptions: Observable<any[]>;
  constructor() { }
  ngOnInit() {

    this.onValueChanges();
    this.filteredOptions = this.group.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.field.options.slice())
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.field.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }




  onValueChanges(): void {
    this.group.valueChanges.subscribe(val => {
      console.log('sssssssssssssssss', val);
    })
  }
}