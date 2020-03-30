import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { InputComponent } from "../input/input.component";
// import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";


// TO bind the components based on the type of the field
const componentMapper = {
  text: InputComponent,
  password: InputComponent,
  // button: ButtonComponent,
  select: SelectComponent,
  // date: DateComponent,
  // radio: RadiobuttonComponent,
  // checkbox: CheckboxComponent
};

@Directive({
  selector: '[dynamicField]',

})
export class DynamicFieldDirective implements OnInit {
  componentRef: any;
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  constructor(private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.input]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}


