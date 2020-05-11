import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormComponent } from '../../admin-shared';
import { FieldConfig } from "../../admin-shared/field.interface";
import { OrganisationService, CommonServiceService } from '../../admin-core';


@Component({
  selector: 'app-create-organisation',
  templateUrl: './createandEdit-organisation.component.html',
  styleUrls: ['./createandEdit-organisation.component.scss']
})
export class CreateandEditOrganisationComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  field: FieldConfig;
  formdata: any;
  action: any;
  title: any;
  orgId: any;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CreateandEditOrganisationComponent>,
    private organisationService: OrganisationService,
    private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.formdata = this.data.fieldsForOrganisation;
    this.action = this.formdata.action;
    if( this.action === 'Add'){
      this.title = 'Add Organisation';
    } else {
      this.title = 'Update Organisation';
    }
    this.orgId = this.data.fieldsForOrganisation.organisationId;
  }

  // On submitting the form
  onSubmit() {
    if (this.form.form.valid) {
      this.createOrganisation(this.form.value);
    } else {
      this.form.validateAllFormFields(this.form.form);
    }

  }

  onEditSubmit() {
    if (this.form.form.valid) {
      this.updateOrganisation(this.form.value);
    } else {
      this.form.validateAllFormFields(this.form.form);
    }
  }

  // Create Organisation
  createOrganisation(organisationData) {
    this.organisationService.createOrganisation(organisationData).subscribe(data => {
      if (data['result'].response === 'SUCCESS') {
        this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', 10000);
        this.form.form.reset();
        this.dialogRef.close('true');
      }
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    });
  }

  // Update Organisation
  updateOrganisation(organisationData) {
    organisationData.organisationId = this.orgId;
    this.organisationService.updateOrganisation(organisationData).subscribe(data => {
      if (data['result'].response === 'SUCCESS') {
        this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', 10000);
        this.form.form.reset();
        this.dialogRef.close('true');
      }
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    });
  }

}
