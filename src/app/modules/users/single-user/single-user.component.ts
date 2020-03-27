import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../admin-core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FieldConfig } from "../../admin-shared/field.interface";
import { DynamicFormComponent } from '../../admin-shared/components/dynamic-form/dynamic-form.component';



@Component({
   selector: 'app-single-user',
   templateUrl: './single-user.component.html',
   styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
   @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
   questions: any[];
   field: FieldConfig;
   group: FormGroup;
  
   formdata: any;
   fieldsbackend: any;

   regConfig: FieldConfig[] = [
      {
         type: "input",
         label: "firstName",
         inputType: "text",
         name: "firstName",
         validations: [
            {
               name: "required",
               validator: Validators.required,
               message: "First Name is Required"
            },
            {
               name: "pattern",
               validator: Validators.pattern("([a-zA-Z]{3,30}\s*)+"),
               message: "Please provide a valid First name"
            }
         ]
      },
      {
         type: "input",
         label: "LastName",
         inputType: "text",
         name: "lastName",
         validations: [
            {
               name: "required",
               validator: Validators.required,
               message: "Last Name is Required"
            },
            {
               name: "pattern",
               validator: Validators.pattern("[a-zA-Z]{3,30}"),
               message: "Please provide a valid Last name"
            }
         ]
      },

      {
         type: "input",
         label: "Email Address",
         inputType: "email",
         name: "email",
         validations: [
            {
               name: "required",
               validator: Validators.required,
               message: "Email Required"
            },
            {
               name: "pattern",
               validator: Validators.pattern(
                  "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
               ),
               message: "Invalid email"
            }
         ]
      },
      {
         type: "input",
         label: "Phone Number",
         inputType: "number",
         name: "phoneNumber",
         validations: [
            {
               name: "required",
               validator: Validators.required,
               message: "Phone Number Required"
            },
            {
               name: "pattern",
               validator: Validators.pattern(
                  "(0/91)?[7-9][0-9]{9}"
               ),
               message: "Invalid Phone Number"
            }
         ]
      },
      {
         type: "input",
         label: "User Name",
         inputType: "text",
         name: "userName",
         validations: [
            {
               name: "required",
               validator: Validators.required,
               message: "User Name Required"
            },
            {
               name: "pattern",
               validator: Validators.pattern(
                  "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
               ),
               message: "Please provide a valid User Name"
            }
         ]
      },
      {
         type: "input",
         label: "Password",
         inputType: "password",
         name: "password",
         validations: [
            {
               name: "required",
               validator: Validators.required,
               message: "Password Required"
            },
            {
               name: "pattern",
               validator: Validators.pattern(
                  "^(?=.*\d).{4,8}$"
               ),
               message: "Minimum four charaters required"
            }
         ]
      },
      {
         type: "radiobutton",
         label: "Gender",
         name: "gender",
         options: ["Male", "Female"],
         value: "Male"
      },
      {
         type: "date",
         label: "DOB",
         name: "dob",
         validations: [
            {
               name: "required",
               validator: Validators.required,
               message: "Date of Birth Required"
            }
         ]
      },
      {
         type: "select",
         label: "Country",
         name: "country",
         value: "UK",
         options: ["India", "UAE", "UK", "US"]
      },
      {
         type: "checkbox",
         label: "Accept Terms",
         name: "term",
         value: true
      },
      // {
      //    type: "button",
      //    label: "Create"
      // }
   ];

   constructor(private formBuilder: FormBuilder, private usersService: UsersService,
      private router: Router, private _snackBar: MatSnackBar) {

   }

   ngOnInit() {
      this.createForm();
   }

   onSubmit() {
      if (this.form.form.valid) {
         this.createUser(this.form.value)
      } else {
         this.form.validateAllFormFields(this.form.form);
      }
   }

   /**
    * To get the form from the backend
    */
   createForm() {
      this.usersService.getUserForm().subscribe(data => {
         this.formdata = data['result'];
         this.fieldsbackend = this.formdata.form;
      }, error => {

      });
   }


   /**
   * To Create the User
   */
   createUser(userdata) {
      console.log('this.form.value', userdata)
      this.usersService.createUser(userdata).subscribe(data => {
         this._snackBar.open('User Created Sucessfully', 'Created', {
            duration: 2000,
         });
         this.form.form.reset();
      }, error => {

      });
   }

}
