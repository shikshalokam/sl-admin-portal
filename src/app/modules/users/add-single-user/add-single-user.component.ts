import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../admin-shared';
import { FieldConfig } from "../../admin-shared/field.interface";
import { FormGroup } from '@angular/forms';
import { UsersService, CommonServiceService } from '../../admin-core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-single-user.component.html',
  styleUrls: ['./add-single-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  field: FieldConfig;
  group: FormGroup;
  formdata: any;
  loading: boolean = false;
  submitClick = false;
  onload = {
    buttonName: 'ADD USER',
    submitClick: false
  }
  constructor(private usersService: UsersService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe, private commonServiceService: CommonServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit() {
    this.formdata = this.data.fieldsBackend;
  }

  // Form Submit
  onSubmit() {
    this.form.value.dateOfBirth = this.datePipe.transform(this.form.value.dateOfBirth, 'yyyy-MM-dd');
    if (this.form.form.valid) {
      if (this.form.value.email || this.form.value.phoneNumber) {
        if (this.form.value.password === this.form.value.confirmPassword) {
          this.createUser(this.form.value)
        } else {
          this.form.validateAllFormFields(this.form.form);
          this._snackBar.open('Password and Confirm password do not match', 'Dismiss', {
            duration: 10000,
            verticalPosition: 'top'
          })
        }
      } else {
        this.form.validateAllFormFields(this.form.form);
        this._snackBar.open('Either Email or PhoneNumber is Mandatory', 'Dismiss', {
          duration: 10000,
          verticalPosition: 'top'
        })
      }

    } else {
      this.form.validateAllFormFields(this.form.form);
    }
  }

  /**
    * To Create the User
    */
  createUser(userdata) {
    this.onload.submitClick = true;
    userdata.dateOfBirth = this.datePipe.transform(userdata.dateOfBirth, 'yyyy-MM-dd');
    this.usersService.createUser(userdata).subscribe(data => {
      if (data['result'].response === 'SUCCESS') {
        this._snackBar.open('User Created Successfully', 'Dismiss', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.form.form.reset();
        this.dialogRef.close();
        this.onload.submitClick = false;
      }
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
      this.onload.submitClick = false;
    });
  }

  close() {
    this.dialogRef.close();
  }

}
