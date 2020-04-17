import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private message = new BehaviorSubject('First Message');
  sharedMessage = this.message.asObservable();
  details: any;

  constructor() { }

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
}
