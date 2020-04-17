import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { Observable } from 'rxjs';
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
  serverName: any;
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

  displayFn(user): string {
    return user && user.label ? user.label : user;
  }
}