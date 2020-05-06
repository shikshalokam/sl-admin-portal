import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormComponent } from '../../admin-shared';
import { FieldConfig } from "../../admin-shared/field.interface";


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
    public dialogRef: MatDialogRef<CreateOrganisationComponent>) { }

  ngOnInit() {
    // this.formdata = this.data.fieldsForOrganisation;

    this.formdata = [
          {
              "field": "name",
              "value": "",
              "visible": true,
              "editable": true,
              "label": "Name",
              "input": "text",
              "validation": [
                  {
                      "name": "required",
                      "validator": "required",
                      "message": "Name required"
                  },
                  {
                      "name": "pattern",
                      "validator": "([a-zA-Z]{3,30}s*)+",
                      "message": "Please Provide Valid Name"
                  }
              ]
          },
          {
              "field": "description",
              "value": "",
              "visible": true,
              "editable": true,
              "label": "Description",
              "input": "textarea",
              "validation": [
                  {
                      "name": "pattern",
                      "validator": "",
                      "message": ""
                  }
              ]
          },
          {
              "field": "email",
              "value": "",
              "visible": true,
              "editable": true,
              "label": "Email",
              "input": "text",
              "validation": [
                  {
                      "name": "pattern",
                      "validator": "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
                      "message": "Please provide a valid Email"
                  }
              ]
          },
          {
              "field": "externalId",
              "value": "",
              "visible": true,
              "editable": true,
              "label": "External Id",
              "input": "text",
              "validation": [
                  {
                      "name": "required",
                      "validator": "required",
                      "message": "External Id required"
                  },
                  {
                      "name": "pattern",
                      "validator": "^[a-z0-9_-]{3,15}$",
                      "message": "Please provide a valid external id"
                  }
              ]
          },
          {
              "field": "provider",
              "value": "",
              "visible": true,
              "editable": true,
              "label": "Provider",
              "input": "text",
              "validation": [
                  {
                      "name": "required",
                      "validator": "required",
                      "message": "Provider required"
                  },
                  {
                      "name": "pattern",
                      "validator": "^[a-z0-9_-]{3,15}$",
                      "message": "Please provide a valid provider"
                  }
              ]
          }
      ]
  
   

  }

  onSubmit() {
    console.log('form');
    if (this.form.form.valid) {

    } else {
      this.form.validateAllFormFields(this.form.form);
    }

  }

}
