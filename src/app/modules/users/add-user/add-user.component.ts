import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../admin-shared';
import { FieldConfig } from "../../admin-shared/field.interface";
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../admin-core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';



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
  formdata: any;
  fieldsbackend: any;
  loading: boolean = false;
  constructor(private usersService: UsersService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit() {
    this.fieldsbackend =  this.data.fieldsbackend;
  }


  /**
   * To get the form from the backend
   */
  createForm() {
    this.usersService.getUserForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsbackend = this.formdata.form;
      this.loading = true;
    }, error => {

    });
  }

  // Form Submit
  onSubmit() {
    console.log('form', JSON.stringify(this.form.value));
    if (this.form.form.valid) {
      this.createUser(this.form.value)
    } else {
      this.form.validateAllFormFields(this.form.form);
    }
  }
  submit(data){

  }

  /**
    * To Create the User
    */
  createUser(userdata) {
    // userdata.organisations = '0125747659358699520';
    console.log('userdata',userdata)
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
