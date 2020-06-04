import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { CommonServiceService } from '../../admin-core';
import { MatSnackBar } from '@angular/material';




@Component({
  selector: 'app-upload-confirmation',
  templateUrl: './upload-confirmation.component.html',
  styleUrls: ['./upload-confirmation.component.scss']
})
export class UploadConfirmationComponent implements OnInit {
  message: any;
  refId: any;
  constructor(private router: Router, public dialogRef: MatDialogRef<UploadConfirmationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data, private _snackBar: MatSnackBar
   ) { }

  ngOnInit() {
    this.message = this.data.message;
    this.refId = this.data.refId
  }

  toCheckStatus() {
    this.router.navigate(['/uploadrecords/list']);
    this.dialogRef.close(false);
  }

  copyInputMessage(inputElement) {
    console.log(inputElement);
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.commonSnackBar('Data Copied Sucessfully', 'Dismiss', 'top', 1000);
  }

  commonSnackBar(message, action, position, time) {
    this._snackBar.open(message, action, {
      duration: time,
      verticalPosition: position
    });
  }

}
