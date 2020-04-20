import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  hide: any;
  mismatch: boolean = false;
  constructor() { }
  ngOnInit() {
  }

  onKey(data) {
    if (this.group.controls.password.value === this.group.controls.confirmpassword.value) {
        this.mismatch = false;
    } {
        this.mismatch = true;
    }
}


checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmpassword').value;

  return pass === confirmPass ? null : { notSame: true }     
}

}
