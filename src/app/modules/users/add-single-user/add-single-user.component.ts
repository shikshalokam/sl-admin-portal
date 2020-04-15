import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../admin-shared';
import { FieldConfig } from "../../admin-shared/field.interface";
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../admin-core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-single-user.component.html',
  styleUrls: ['./add-single-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  questions: any[];
  field: FieldConfig;
  group: FormGroup;
  formdata: any;
  loading: boolean = false;
  constructor(private usersService: UsersService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit() {
    this.formdata = this.data.fieldsBackend;
  }

  // Form Submit
  onSubmit() {
    console.log('form', JSON.stringify(this.form.value));
    // if(this.form.value.email || this.form.value.phoneNumber){

    // }
    if (this.form.form.valid) {
      if (this.form.value.email || this.form.value.phoneNumber) {
        this.createUser(this.form.value)
      } else {
        this.form.validateAllFormFields(this.form.form);
        this._snackBar.open('Either Email or phone is mandatory', 'Error',{
          duration: 2000
        })
      }

    } else {
      this.form.validateAllFormFields(this.form.form);
    }
  }
  submit(data) {

  }

  /**
    * To Create the User
    */
  createUser(userdata) {
    console.log('userdata', userdata)
    this.usersService.createUser(userdata).subscribe(data => {
      if (data['result'].response === 'SUCCESS') {
        this._snackBar.open('User Created Sucessfully', 'Created', {
          duration: 2000,
        });
        this.form.form.reset();
        this.dialogRef.close();
      }
    }, error => {
      this._snackBar.open(error.error.message.params.errmsg, 'error', {
        duration: 2000,
      });
    });
  }

  close() {
    this.dialogRef.close();
  }

}
