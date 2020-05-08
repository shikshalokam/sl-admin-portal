import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormComponent } from '../../admin-shared';
import { FieldConfig } from "../../admin-shared/field.interface";
import { OrganisationService, CommonServiceService } from '../../admin-core';


@Component({
  selector: 'app-create-organisation',
  templateUrl: './create-organisation.component.html',
  styleUrls: ['./create-organisation.component.scss']
})
export class CreateOrganisationComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  field: FieldConfig;
  formdata: any;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CreateOrganisationComponent>,
    private organisationService: OrganisationService,
    private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.formdata = this.data.fieldsForOrganisation;
  }

  // On submitting the form
  onSubmit() {
    if (this.form.form.valid) {
      this.createOrganisation(this.form.value);
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
        this.dialogRef.close();
      }
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    });
  }

}
