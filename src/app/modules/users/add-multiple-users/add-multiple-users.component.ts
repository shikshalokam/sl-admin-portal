import { Component, OnInit, Optional, Inject } from '@angular/core';
import { UsersService, CommonServiceService } from '../../admin-core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { saveAs } from "file-saver";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogComponent, ConfirmDialogModel, UploadConfirmationComponent } from '../../admin-shared';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-add-multiple-users',
  templateUrl: './add-multiple-users.component.html',
  styleUrls: ['./add-multiple-users.component.scss']
})
export class AddMultipleUsersComponent implements OnInit {
  filecontent: any;
  myForm: FormGroup;
  orgData: any;
  requestId: any;
  selected: any;
  datePipe: any;
  fileName: any;
  selectedFile: any;
  type: any;
  CSVfile: any;
  loader: boolean = false;
  confirmPopupResult: any;
  onload = {
    buttonName: 'UPLOAD',
    submitClick: false
  }
  constructor(private usersService: UsersService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder,
    private commonServiceService: CommonServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddMultipleUsersComponent>
  ) { }

  ngOnInit() {
    this.selected = this.data.defaultValue;
    this.orgData = this.data.organisationsToUpload;
    console.log('this.orgData',  this.orgData );
    
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      organisation: [this.data.defaultValue.value, [Validators.required]],
      userscsv: ['', Validators.compose([Validators.required, Validators.pattern("^.+\.(xlsx|xls|csv)$")])]
    })
    this.myForm.controls['organisation'].setValue(this.data.defaultValue.value, { onlySelf: true });
  }

  /* Handle form errors*/
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  downloadSampleUsers() {
    this.commonServiceService.downloadSample(this.data.downloadedData.url, 'Sample-Users')
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

  // Sendind csv to service
  uploadUsersCSVFile() {
    if (this.myForm.valid && this.filecontent) {
      this.onload.submitClick = true;
      this.loader = true;
      this.usersService.uploadUsersCsv(this.myForm.value, this.filecontent).subscribe(res => {
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
