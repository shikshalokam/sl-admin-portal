import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../admin-core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { QuestionBase } from '../../admin-shared';


@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;
  dynamicForm: FormGroup;
  submitted = false;
  entitysubmitted = false;
  formdata: any;
  fieldsbackend: any;
  loading: boolean = false;
  fields = [
    {
      type: "input",
      label: "firstName",
      inputType: "text",
      name: "name",
      visible: true,
      editable: true,
      required: true,
      validations: [
        {
          name: "required",
          validator: "required",
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: "^[a-zA-Z]+$",
          message: "Accept only text"
        }
      ]
    },
    {
      "label": "firstName",
      "field": "firstName",
      "value": "",
      "visible": true,
      "editable": true,
      "input": "text",
      "validation": {
        "required": true,
        "regex": "/^[A-Za-z]+$/"
      }
    },

    {
      type: "password",
      label: "Password",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: "required",
          message: "Password Required"
        }
      ]
    }
  ];


  constructor(private formBuilder: FormBuilder, private usersService: UsersService,
    private router: Router, private _snackBar: MatSnackBar) {
    this.questions$ = usersService.getQuestions();
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.createUser(this.dynamicForm.value);
  }

  /**
   * To get the form from the backend
   */
  createForm() {
    this.usersService.getUserForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsbackend = this.formdata.form;
      const controls = {};
      this.fieldsbackend.forEach(res => {
        const validationsArray = [];
        if (res.validation.required) {
          validationsArray.push(Validators.required);
          validationsArray.push(Validators.pattern("^([+-]{1})([0-9]{3})$"));
        }
        controls[res.label] = new FormControl('', validationsArray);
      });
      this.dynamicForm = new FormGroup(
        controls
      );
      this.loading = true;
    }, error => {

    });
  }


  /**
  * To Create the User
  */
  createUser(userdata) {
    let data = {
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      email: userdata.email,
      phoneNumber: userdata.phoneNumber,
      userName: userdata.userName,
      password: userdata.password
    }
    this.usersService.createUser(data).subscribe(data => {
      this._snackBar.open('User Created Sucessfully', 'Created', {
        duration: 2000,
      });
      this.dynamicForm.reset();
    }, error => {

    });
  }

}
