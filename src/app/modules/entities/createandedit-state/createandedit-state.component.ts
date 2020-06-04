import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormComponent } from '../../admin-shared';
import { EntityService } from '../../admin-core/services/entity-service/entity.service';
import { CommonServiceService } from '../../admin-core';


@Component({
  selector: 'app-createandedit-state',
  templateUrl: './createandedit-state.component.html',
  styleUrls: ['./createandedit-state.component.scss']
})
export class CreateandeditStateComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formdata: any;
  action: any;
  title: any;
  orgId: any;
  onload: any;
  submitButton: any;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<CreateandeditStateComponent>,
    private entityService: EntityService, private commonServiceService: CommonServiceService) { }

  ngOnInit() {

    this.formdata = this.data.fieldsForState;
    this.action = this.formdata.action;
    if (this.action === 'Add') {
      this.title = 'Add State';
      this.onload = {
        buttonName: 'ADD STATE',
        submitClick: false
      }

    } else {
      this.title = 'Update State';
      this.onload = {
        buttonName: 'UPDATE STATE',
        submitClick: false
      }
    }
  }


  handleChange(data) {
    if (this.action === 'Add') {
      this.onSubmit();
    } else {
      this.onEditSubmit();
    }

  }

  // On submitting the form
  onSubmit() {
    if (this.form.form.valid) {
      this.createState(this.form.value);
    } else {
      this.form.validateAllFormFields(this.form.form);
    }

  }

  onEditSubmit() {

  }

    // Create Organisation
    createState(stateData) {
      this.onload.submitClick = true;
      this.entityService.createState(stateData).subscribe(data => {
        if (data['result'].response === 'SUCCESS') {
          this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', 10000);
          this.form.form.reset();
          this.dialogRef.close('true');
        }
      }, error => {
        this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
        this.onload.submitClick = false;
      });
    }

}
