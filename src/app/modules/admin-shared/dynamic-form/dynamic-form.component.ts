import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../admin-core';
import { SingleUserComponent } from '../../users/single-user/single-user.component';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [UsersService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: any;
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: UsersService, private singleuser: SingleUserComponent) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.singleuser.createUser(this.payLoad);
  }
}