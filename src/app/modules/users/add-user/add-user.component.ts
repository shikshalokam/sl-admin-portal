import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../admin-shared';
import { FieldConfig } from "../../admin-shared/field.interface";
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../admin-core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  questions: any[];
  field: FieldConfig;
  group: FormGroup;
  // regConfig: any[];
  formdata: any;
  fieldsbackend: any;
  loading: boolean = false;
  regConfig: FieldConfig[] = [
    {
      "field": "firstName",
      "value": "",
      "name": " ",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "First name required"
        },
        {
          "name": "pattern",
          "validator": "([a-zA-Z]{3,30}\s*)+",
          "message": "Please provide a valid First name"
        }
      ],
      "label": "First name",
      "input": "text"
    },
    {
      "field": "lastName",
      "value": "",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "Last name required"
        },
        {
          "name": "pattern",
          "validator": "[a-zA-Z]{3,30}",
          "message": "Please provide a valid Last name"
        }
      ],
      "label": "Last name",
      "input": "text"
    },
    {
      "field": "email",
      "value": "",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "Email required"
        },
        {
          "name": "pattern",
          "validator": "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
          "message": "Please provide a valid Email"
        }
      ],
      "label": "Email",
      "input": "text"
    },
    {
      "field": "phoneNumber",
      "value": "",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "Phone Number required"
        },
        {
          "name": "pattern",
          "validator": "^[A-Za-z]+$/",
          "message": "Please provide a valid Phone Number"
        }
      ],
      "label": "Phone Number",
      "input": "text"
    },
    {
      "field": "userName",
      "value": "",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "User Name required"
        },
        {
          "name": "pattern",
          "validator": "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$",
          "message": "Please provide a valid User Name"
        }
      ],
      "label": "User Name",
      "input": "text"
    },
    {
      "field": "password",
      "value": "",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "Password required"
        },
        {
          "name": "pattern",
          "validator": "/^(?=.*d).{4,}$/",
          "message": "Minimum four charaters required"
        }
      ],
      "label": "Password",
      "input": "password"
    },
    {
      "field": "state",
      "value": "",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "State required"
        },
        {
          "name": "pattern",
          "validator": "",
          "message": ""
        }
      ],
      "label": "State",
      "input": "select",
      "options": [
        {
          "label": "Karnataka",
          "value": "5d6609ef81a57a6173a79e7a"
        },
        {
          "label": "Goa",
          "value": "5d6609ef81a57a6173a79e79"
        },
        {
          "label": "Dummy KEF State",
          "value": "5de4c1fb1f6a980ca737c7f5"
        },
        {
          "label": "Delhi",
          "value": "5d6609ef81a57a6173a79e78"
        },
        {
          "label": "Punjab",
          "value": "5da96a79f91e5f43e4104ec7"
        },
        {
          "label": "Goa",
          "value": "5dba74f5ef7a6518ddabbd8c"
        },
        {
          "label": "KARNATAKA",
          "value": "5dca7951a31c183b48ef847c"
        },
        {
          "label": "Rajasthan",
          "value": "5de4f9e9bedec30a7bb9671d"
        }
      ]
    },
    {
      "field": "organisations",
      "value": "",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "Organisations required"
        },
        {
          "name": "pattern",
          "validator": "",
          "message": ""
        }
      ],
      "label": "Organisations",
      "input": "select",
      "options": [
        {
          "label": "0125747659358699520",
          "value": "0125747659358699520"
        }
      ]
    },
    {
      "field": "roles",
      "value": "",
      "visible": true,
      "editable": true,
      "validation": [
        {
          "name": "required",
          "validator": "required",
          "message": "Roles required"
        },
        {
          "name": "pattern",
          "validator": "",
          "message": ""
        }
      ],
      "label": "Roles",
      "input": "select",
      "options": [
        {
          "label": "Observation Designer",
          "value": "5da6f7da280a694559c2cef9"
        },
        {
          "label": "Observation Reviewer",
          "value": "5da6f7da280a694559c2cefa"
        },
        {
          "label": "Platform Admin",
          "value": "5e71eb418fff053cb94fa2ae"
        },
        {
          "label": "Organisation Admin",
          "value": "5e71eb418fff053cb94fa2af"
        }
      ]
    }
  ]
  constructor(private usersService: UsersService,
    public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit() {
    this.createForm();
  }


   /**
    * To get the form from the backend
    */
   createForm() {
    this.usersService.getUserForm().subscribe(data => {
       this.formdata = data['result'];
       this.fieldsbackend = this.formdata.form;
       // this.regConfig = this.formdata.form
       this.loading = true;
      //  console.log(' this.regConfig',  this.regConfig);s
    }, error => {

    });
 }

 close(){
  this.dialogRef.close();
 }

}
