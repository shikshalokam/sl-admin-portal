import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private message = new BehaviorSubject('First Message');
  sharedMessage = this.message.asObservable();
  details: any;
  editUserDetails: any;

  constructor(private _snackBar: MatSnackBar) { }

  nextMessage(message: string) {
    this.message.next(message)
  }

  // To set the data
  setUserDetails(data) {
    this.details = data;
    console.log('setting data', this.details);
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

  errorHandling(error) {
    if (error.error.message) {
      this.commonSnackBar(error.error.message, 'Dismiss', 'top', 10000);
    } else {
      this.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    }
  }

}
