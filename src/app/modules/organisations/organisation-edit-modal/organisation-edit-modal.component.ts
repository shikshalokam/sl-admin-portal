import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormComponent } from '../../admin-shared';
import { FieldConfig } from "../../admin-shared/field.interface";
import { OrganisationService, CommonServiceService } from '../../admin-core';


@Component({
  selector: 'app-organisation-edit-modal',
  templateUrl: './organisation-edit-modal.component.html',
  styleUrls: ['./organisation-edit-modal.component.scss']
})
export class OrganisationEditModalComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  field: FieldConfig;
  formdata: any;
  orgId: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrganisationEditModalComponent>,
    private organisationService: OrganisationService,
    private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    console.log('OrganisationEditModalComponent', this.data);
    this.formdata = this.data.fieldsForOrganisation;
    this.orgId = this.data.fieldsForOrganisation.organisationId;
  }

  onSubmit() {
    if (this.form.form.valid) {
      this.updateOrganisation(this.form.value);
    } else {
      this.form.validateAllFormFields(this.form.form);
    }
  }

  // Create Organisation
  updateOrganisation(organisationData) {
    // organisationData.organisationId = this.orgId;
    let data = {
      name: organisationData.name,
      description: organisationData.description,
      email: organisationData.email,
      address: organisationData.address,
      organisationId: this.orgId
    }


    this.organisationService.updateOrganisation(data).subscribe(data => {
      if (data['result'].response === 'SUCCESS') {
        this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', 10000);
        this.form.form.reset();
        this.dialogRef.close();
      }
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    });
  }


}
