import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bulk-upload-entities',
  templateUrl: './bulk-upload-entities.component.html',
  styleUrls: ['./bulk-upload-entities.component.scss']
})
export class BulkUploadEntitiesComponent implements OnInit {
  myForm: FormGroup;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      organisation: ['', [Validators.required]],
      userscsv: ['', Validators.compose([Validators.required, Validators.pattern("^.+\.(xlsx|xls|csv)$")])]
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

}
