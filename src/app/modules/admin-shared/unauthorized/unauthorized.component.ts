import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../admin-core/services/common-service.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  userdetails: any;
  username: any;
  constructor(private commonServiceService:CommonServiceService) { }

  ngOnInit() {
    this.userdetails = this.commonServiceService.getUserDetails();
    if (this.userdetails) {
      this.username = this.userdetails.firstName;
    }
  }

  

}
