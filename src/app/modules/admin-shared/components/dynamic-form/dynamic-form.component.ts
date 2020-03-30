import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig, Validator } from "../../field.interface";


@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
  <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
  </ng-container>
  </form>
  `
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createControl();
  }

// Binding the controls with the fields
  createControl() {
     const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.input === "button")
       return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validation || [])
      );
      group.addControl(field.field, control);
    });
    return group;
  }

  // To bind the validations
  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        if(valid.name === 'required') {
          validList.push(Validators.required)
        }
        if(valid.name === 'pattern'){
          validList.push(Validators.pattern(valid.validator))

        }
      });
      return Validators.compose(validList);
    }
    return null;
  }

  get value() {
    return this.form.value;
  }

  // on submitting the form
  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }


  // To Validate the form
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

}
