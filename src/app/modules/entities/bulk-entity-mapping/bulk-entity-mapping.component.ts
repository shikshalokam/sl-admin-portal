import { Component, Optional, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../../admin-core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntityService } from '../../admin-core/services/entity-service/entity.service';
import { UploadConfirmationComponent } from '../../admin-shared';

@Component({
  selector: 'app-bulk-entity-mapping',
  templateUrl: './bulk-entity-mapping.component.html',
  styleUrls: ['./bulk-entity-mapping.component.scss']
})
export class BulkEntityMappingComponent implements OnInit {

  orgData: any;
  requestId: any;
  selected: any;
  datePipe: any;
  fileName: any;
  selectedFile: any;
  filecontent: any;
  type: any;
  CSVfile: any;
  sampleEntityMappingData: any;
  loader: boolean = false;
  confirmPopupResult: any;
  onload = {
    buttonName: 'UPLOAD',
    submitClick: false
  }
  myForm: FormGroup;
  statesList: any;
  constructor(public fb: FormBuilder, private commonServiceService: CommonServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog, private entityService: EntityService,
    public dialogRef: MatDialogRef<BulkEntityMappingComponent>) { }

  ngOnInit() {
    this.reactiveForm();
    this.getStateList();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      state: ['', [Validators.required]],
      userscsv: ['', Validators.compose([Validators.required, Validators.pattern("^.+\.(xlsx|xls|csv)$")])]
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  getStateList() {
    this.entityService.getStatesList().subscribe(data => {
      this.statesList = data['result'];
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
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

  // Sample Entity Mapping CSV Download
  getSampleEntityMappingCsv() {
    this.entityService.sampleEntityMappingCSV().subscribe(data => {
      this.commonServiceService.downloadSample(data['result']['url'], 'Sample-entity-mapping');
    }, error => {
      this.commonServiceService.errorHandling(error);
    })
  }

  
  // Sendind csv to service
  uploadEntityMappingCSVFile() {
    if (this.myForm.valid && this.filecontent) {
      this.onload.submitClick = true;
      this.loader = true;
      this.entityService.uploadEntityMappingCsv(this.myForm.value, this.filecontent).subscribe(res => {
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
