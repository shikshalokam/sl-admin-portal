import { Component, OnInit, Optional, Inject } from '@angular/core';
import { UsersService, CommonServiceService } from '../../admin-core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { saveAs } from "file-saver";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-add-multiple-users',
  templateUrl: './add-multiple-users.component.html',
  styleUrls: ['./add-multiple-users.component.scss']
})
export class AddMultipleUsersComponent implements OnInit {
  filecontent: any;
  downloadurl: 'download url from server';
  myForm: FormGroup;
  orgData: any;
  requestId: any;
  selected: any;
  datePipe: any;
  fileName: any;
  // submitClick: boolean = false;
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
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      organisation: [this.data.defaultValue.value, [Validators.required]],
      userscsv: ['', [Validators.required]]
    })
    this.myForm.controls['organisation'].setValue(this.data.defaultValue.value, { onlySelf: true });
  }

  /* Handle form errors*/
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  downloadSample() {
    this.downLoadFile(this.data.downloadedData, '"text/csv"');
  }

  // To download selected records
  downLoadFile(data: any, type: string) {
    const date = new Date();
    this.datePipe = new DatePipe("en-US");
    this.fileName = 'Sample' + '-' + this.datePipe.transform(date, 'dd-mm-yyyy-HH-mm-ss') + '.csv';
    let blob = new Blob([data], { type: type });
    saveAs(blob, this.fileName);
    this._snackBar.open('Sample File Downloaded Successfully', 'success', {
      duration: 10000,
      verticalPosition: 'top'
    })
  }

  // File Handling
  handleFileInput(files: Event) {
    const file = files[0];
    this.filecontent = file;
  }

  handleChange(data) {

  }

  // Sendind csv to service
  uploadUsersCSVFile() {
    if (this.myForm.valid) {
      this.onload.submitClick = true;
      this.usersService.uploadUsersCsv(this.myForm.value, this.filecontent).subscribe(res => {
        if (res['status'] === 200) {
          this.commonServiceService.commonSnackBar(res['message'], 'Dismiss', 'top', 1000);
          this.requestId = res['result']['requestId'];
          this.confirmDialog(this.requestId);
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
        }
      }, err => {
        this.onload.submitClick = false;
        this.commonServiceService.commonSnackBar(err.error.message.params.errmsg, 'Dismiss', 'top', 10000);
      });
    }
  }

  // confirmDialog
  confirmDialog(data) {
    const message = `Please use this Ref No to check the status ` + data;

    const dialogData = new ConfirmDialogModel("upload", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      height: "300px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
      } else {
        this.dialog.closeAll();
      }

    });
  }

  close() {
    this.dialogRef.close();
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
