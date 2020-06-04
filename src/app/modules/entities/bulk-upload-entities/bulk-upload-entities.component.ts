import { Component, Optional, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../../admin-core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntityService } from '../../admin-core/services/entity-service/entity.service';
import { UploadConfirmationComponent } from '../../admin-shared';


@Component({
  selector: 'app-bulk-upload-entities',
  templateUrl: './bulk-upload-entities.component.html',
  styleUrls: ['./bulk-upload-entities.component.scss']
})
export class BulkUploadEntitiesComponent implements OnInit {
  orgData: any;
  requestId: any;
  selected: any;
  datePipe: any;
  fileName: any;
  selectedFile: any;
  filecontent: any;
  type: any;
  CSVfile: any;
  loader: boolean = false;
  confirmPopupResult: any;
  statesList: any;
  entityList: any;
  onload = {
    buttonName: 'UPLOAD',
    submitClick: false
  }
  myForm: FormGroup;
  constructor(public fb: FormBuilder, private commonServiceService: CommonServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog, private entityService: EntityService,
    public dialogRef: MatDialogRef<BulkUploadEntitiesComponent>) { }

  ngOnInit() {
    this.reactiveForm();
    this.getStateList();
    this.getEntityTpes();
  }

  getStateList() {
    this.entityService.getStatesList().subscribe(data => {
      console.log('statesList', data);
      this.statesList = data['result'];
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }


  getEntityTpes() {
    this.entityService.getEntityList().subscribe(data => {
      console.log('getEntityTpes', data);
      this.entityList = data['result'];
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      state: ['', [Validators.required]],
      entitytype: ['', [Validators.required]],
      userscsv: ['', Validators.compose([Validators.required, Validators.pattern("^.+\.(xlsx|xls|csv)$")])]
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }


  // File Handling
  handleFileInput(files: Event) {
    const file = files[0];
    this.filecontent = file;
    this.selectedFile = file.name;
    if (this.selectedFile.length > 20) {
      this.CSVfile = this.selectedFile.slice(0, 20) + '...' + file.name.split('.')[1];
    } else {
      this.CSVfile = this.selectedFile
    }
  }

  clearSelectedFile() {
    this.CSVfile = '';
    this.filecontent = '';
    (<HTMLInputElement>document.getElementById('upload')).value = null;
  }

  downloadSample() {

  }


  // Sendind csv to service
  uploadEntityCSVFile() {
    if (this.myForm.valid && this.filecontent) {
      this.onload.submitClick = true;
      this.loader = true;
      this.entityService.uploadEntityCsv(this.myForm.value, this.filecontent).subscribe(res => {
        if (res['status'] === 200) {
          this.commonServiceService.commonSnackBar(res['message'], 'Dismiss', 'top', 1000);
          this.requestId = res['result']['requestId'];
          this.confirmDialog(this.requestId);
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
        }
      }, error => {
        this.onload.submitClick = false;
        this.loader = false;
        this.commonServiceService.errorHandling(error);
      });
    } else {
      this.commonServiceService.commonSnackBar('Please Select the Valid CSV File', 'Dismiss', 'top', 10000);
    }
  }

   // confirmDialog
   confirmDialog(refId) {
    const message = `Please use this Ref No to check the status:`;
    const dialogRef = this.dialog.open(UploadConfirmationComponent, {
      width: "400px",
      height: "250px",
      data: { message, refId }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
      } else {
        this.dialog.closeAll();
      }

    });
  }

}
