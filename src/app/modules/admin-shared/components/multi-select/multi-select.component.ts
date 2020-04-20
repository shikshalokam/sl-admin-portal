// import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormControlName } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit,Input, QueryList, ViewChildren } from '@angular/core';
import { DOWN_ARROW, TAB, ESCAPE } from '@angular/cdk/keycodes';
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
  serverName: any;
  selectedUsers: any = [];
  filteredOptions: Observable<any[]>;


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // fruitCtrl = new FormControl();
  filtereddata: any;
  fruits: any[] = [];
  public bankMultiFilterCtrl: FormControl = new FormControl();
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('searchInput', { read: MatAutocompleteTrigger }) autoComplete;
  @Input() noEntriesFoundLabel = 'No data Found';
  constructor() { }
  ngOnInit() {
    this.finaldata = this.field.options;
    this.filteredOptions = this.group.get(this.field.field)!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.finaldata = this.filterBanksMulti();

      });

    this.filtereddata = this.group.get(this.field.field)!.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.field.options.slice()));
  }

  protected filterBanksMulti() {
    const filterValue = this.bankMultiFilterCtrl.value.toLowerCase();
    return this.field.options.filter(option => option.label.toLowerCase().includes(filterValue));
  
  }


  protected _onDestroy = new Subject<void>();

  OnInput(event: any) {
    this.serverName = event.target.value;
    this.finaldata = this._filter(this.serverName);
  }

  private _filter1(value: any) {
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
  // ---------------------------------------------------
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.addFruit(value);
    }

    if (input) {
      input.value = '';
    }
    this.group.get(this.field.field).setValue(this.fruits);
    // this.fruitCtrl.setValue(null);
  }

  remove(fruit) {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  onRoleSelectionChange(event: MatAutocompleteSelectedEvent): void {
    this.updateFruitList(event.option.viewValue);
    this.searchInput.nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
    this.group.get(this.field.field).setValue(null);
    setTimeout(() => {
      this.autoComplete.openPanel();
    });
  }

  private _filter(value) {
    if (typeof (value) == 'object') {
      const filterValue = value.label.toLowerCase();

      return this.field.options.filter(option => option.label.toLowerCase().includes(filterValue));
    } else {
      const filterValue = value.toLowerCase();

      return this.field.options.filter(option => option.label.toLowerCase().includes(filterValue));
    }
  }


  onCheckboxClick(event: MouseEvent) {
    event.preventDefault();
  }

  addFruit(fruit) {
    this.fruits.push(fruit);
  }

  isFruitSelected(fruit): boolean {
    return this.fruits.indexOf(fruit) >= 0;
  }

  updateFruitList(fruit) {

    if (this.isFruitSelected(fruit)) {
      this.remove(fruit);
    } else {
      this.addFruit(fruit);
    }
  }




}

