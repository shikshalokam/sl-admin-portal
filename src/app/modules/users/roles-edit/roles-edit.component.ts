import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {
  myForm: FormGroup;
  roleFormArray: any;
  selecteddata: any;
  data: any;
  constructor(@Inject(MAT_DIALOG_DATA) public rolesData: any,
  private fb: FormBuilder,public dialogRef: MatDialogRef<RolesEditComponent>,) { }

  ngOnInit() {
    this.data = this.rolesData[0];
    this.selecteddata = this.rolesData[1];
    this.myForm = this.fb.group({
      userrole: this.fb.array([])
    });

  }

  onChange(role: string, isChecked) {
    this.roleFormArray = <FormArray>this.myForm.controls.userrole;

    if (isChecked) {
      this.roleFormArray.push(new FormControl(role));
    } else {
      let index = this.roleFormArray.controls.findIndex(x => x.value == role)
      this.roleFormArray.removeAt(index);
    }
  }
  onDismiss(){
    this.dialogRef.close();
  }
  onConfirm(){
    console.log('yyyyyyyyyy', this.roleFormArray);
    
  }
}
