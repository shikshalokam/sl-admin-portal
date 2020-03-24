import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../admin-core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  questions: any[];
  questions1 = [
    {
       "field":"firstName",
       "value":"",
       "visible":true,
       "editable":true,
       "validation":[
          {
             "name":"required",
             "validator":"required",
             "message":"First name required"
          },
          {
             "name":"pattern",
             "validator":"^[A-Za-z]+$/",
             "message":"Please provide a valid First name"
          }
       ],
       "label":"First name",
       "input":"text"
    },
    {
       "field":"lastName",
       "value":"",
       "visible":true,
       "editable":true,
       "validation":[
          {
             "name":"required",
             "validator":"required",
             "message":"Last name required"
          },
          {
             "name":"pattern",
             "validator":"^[A-Za-z]+$/",
             "message":"Please provide a valid Last name"
          }
       ],
       "label":"Last name",
       "input":"text"
    },
    {
       "field":"email",
       "value":"",
       "visible":true,
       "editable":true,
       "validation":[
          {
             "name":"required",
             "validator":"required",
             "message":"Email required"
          },
          {
             "name":"pattern",
             "validator":"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
             "message":"Please provide a valid Email"
          }
       ],
       "label":"Email",
       "input":"text"
    },
    {
       "field":"phoneNumber",
       "value":"",
       "visible":true,
       "editable":true,
       "validation":[
          {
             "name":"required",
             "validator":"required",
             "message":"Phone Number required"
          },
          {
             "name":"pattern",
             "validator":"^((+)?(d{2}[-]))?(d{10}){1}?$",
             "message":"Please provide a valid Phone Number"
          }
       ],
       "label":"Phone Number",
       "input":"text"
    },
    {
       "field":"userName",
       "value":"",
       "visible":true,
       "editable":true,
       "validation":[
          {
             "name":"required",
             "validator":"required",
             "message":"User Name required"
          },
          {
             "name":"pattern",
             "validator":"^[A-Za-z]+$/",
             "message":"Please provide a valid User Name"
          }
       ],
       "label":"User Name",
       "input":"text"
    },
    {
       "field":"password",
       "value":"",
       "visible":true,
       "editable":true,
       "validation":[
          {
             "name":"required",
             "validator":"required",
             "message":"Password required"
          },
          {
             "name":"pattern",
             "validator":"/^(?=.*d).{4,}$/",
             "message":"Minimum four charaters required"
          }
       ],
       "label":"Password",
       "input":"password"
    },
    {
       "field":"state",
       "value":"",
       "visible":true,
       "editable":true,
       "validation":[
          {
             "name":"required",
             "validator":"required",
             "message":"State required"
          },
          {
             "name":"pattern",
             "validator":"",
             "message":""
          }
       ],
       "label":"State",
       "input":"select",
       "options":[]
    },
    {
       "field":"organisations",
       "value":"",
       "visible":true,
       "editable":true,
       "validation":[
          {
             "name":"required",
             "validator":"required",
             "message":"Organisations required"
          },
          {
             "name":"pattern",
             "validator":"",
             "message":""
          }
       ],
       "label":"Organisations",
       "input":"select",
       "options":[
          {
             "label":"0125747659358699520",
             "value":"0125747659358699520"
          }
       ]
    }
 ]
  dynamicForm: FormGroup;
  submitted = false;
  entitysubmitted = false;
  formdata: any;
  fieldsbackend: any;
  loading: boolean = false;


  


  constructor(private formBuilder: FormBuilder, private usersService: UsersService,
    private router: Router, private _snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    // this.createUser(this.dynamicForm.value);
  }




  /**
   * To get the form from the backend
   */
  createForm() {
    this.usersService.getUserForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsbackend = this.formdata.form;
      this.questions = this.fieldsbackend;
      const controls = {};
      this.fieldsbackend.forEach(res => {
        const validationsArray = [];
        if (res.validation.required) {
          validationsArray.push(Validators.required);
          validationsArray.push(Validators.pattern(res.regex));
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
    console.log('createUser', userdata);
    let data = {
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      email: userdata.email,
      phoneNumber: userdata.phoneNumber,
      userName: userdata.userName,
      password: userdata.password,
      organisations: userdata.organisations,
      state: userdata.state
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
