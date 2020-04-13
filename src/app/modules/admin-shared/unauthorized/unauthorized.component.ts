import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  userdetails: any;
  username: any;
  constructor() { }

  ngOnInit() {
    this.userdetails =  JSON.parse(localStorage.getItem('userdetails'));
    if (this.userdetails) {
      this.username = this.userdetails.firstName;
    }
  }

  

}
