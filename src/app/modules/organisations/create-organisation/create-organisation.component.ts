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
    // this.formdata = [
    //   {
    //     "field": "name",
    //     "value": "srikanth",
    //     "visible": true,
    //     "editable": true,
    //     "label": "Name",
    //     "input": "text",
    //     "validation": [
    //       {
    //         "name": "required",
    //         "validator": "required",
    //         "message": "Name required"
    //       },
    //       {
    //         "name": "pattern",
    //         "validator": "([a-zA-Z]{3,30}s*)+",
    //         "message": "Please Provide Valid Name"
    //       }
    //     ]
    //   },
    //   {
    //     "field": "description",
    //     "value": "",
    //     "visible": true,
    //     "editable": true,
    //     "label": "Description",
    //     "input": "textarea",
    //     "validation": [
    //       {
    //         "name": "pattern",
    //         "validator": "",
    //         "message": ""
    //       }
    //     ]
    //   },
    //   {
    //     "field": "email",
    //     "value": "",
    //     "visible": true,
    //     "editable": true,
    //     "label": "Email",
    //     "input": "text",
    //     "validation": [
    //       {
    //         "name": "pattern",
    //         "validator": "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
    //         "message": "Please provide a valid Email"
    //       }
    //     ]
    //   },
    //   {
    //     "field": "externalId",
    //     "value": "",
    //     "visible": true,
    //     "editable": true,
    //     "label": "External Id",
    //     "input": "text",
    //     "validation": [
    //       {
    //         "name": "required",
    //         "validator": "required",
    //         "message": "External Id required"
    //       },
    //       {
    //         "name": "pattern",
    //         "validator": "^[a-z0-9_-]{3,15}$",
    //         "message": "Please provide a valid external id"
    //       }
    //     ]
    //   },
    //   {
    //     "field": "provider",
    //     "value": "",
    //     "visible": true,
    //     "editable": true,
    //     "label": "Provider",
    //     "input": "text",
    //     "validation": [
    //       {
    //         "name": "required",
    //         "validator": "required",
    //         "message": "Provider required"
    //       },
    //       {
    //         "name": "pattern",
    //         "validator": "^[a-z0-9_-]{3,15}$",
    //         "message": "Please provide a valid provider"
    //       }
    //     ]
    //   }
    // ]
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
