import { Component, OnInit, ViewChild } from '@angular/core';
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
      this.loading = true;
    }, error => {

    });
  }

  // Form Submit
  onSubmit() {
    if (this.form.form.valid) {
      this.createUser(this.form.value)
    } else {
      this.form.validateAllFormFields(this.form.form);
    }
  }

  /**
    * To Create the User
    */
  createUser(userdata) {
    userdata.organisations = '';
    console.log('userdata',userdata)
    this.usersService.createUser(userdata).subscribe(data => {
      if (data['result'].response === 'Sucess') {
        this._snackBar.open('User Created Sucessfully', 'Created', {
          duration: 2000,
        });
        this.form.form.reset();
      }
    }, error => {

    });
  }

  close() {
    this.dialogRef.close();
  }

}
