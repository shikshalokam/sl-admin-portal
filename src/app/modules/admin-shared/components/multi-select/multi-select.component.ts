import { FormGroup, FormControl } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { Subject } from 'rxjs';
import { Component,  OnInit} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

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
      .pipe()
      .subscribe(() => {
        this.finaldata = this.filterRolesMulti();

      });
  }

  protected filterRolesMulti() {
    const filterValue = this.roleMultiFilterCtrl.value.toLowerCase();
    return this.field.options.filter(option => option.label.toLowerCase().includes(filterValue));

  }

}

