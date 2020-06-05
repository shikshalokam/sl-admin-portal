import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  datePipe: any;
  details: any;
  fileName: any;
  constructor(private _snackBar: MatSnackBar) { }

  // To set the data
  setUserDetails(data) {
    this.details = data;
  }

  getUserDetails() {
    return this.details;
  }

  // Commonly used in all pages
  commonSnackBar(message, action, position, time) {
    this._snackBar.open(message, action, {
      duration: time,
      verticalPosition: position
    });
  }

  // To handle the error messages commonly
  errorHandling(error) {
    if (error.error.message) {
      this.commonSnackBar(error.error.message, 'Dismiss', 'top', 10000);
    } else {
      this.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    }
  }

  downloadSample(fileurl, Name) {
    const date = new Date();
    this.datePipe = new DatePipe("en-US");
    this.fileName = Name + '-' + this.datePipe.transform(date, 'dd-mm-yyyy-HH-mm-ss') + '.csv';
    saveAs(fileurl, this.fileName);
  }

}
