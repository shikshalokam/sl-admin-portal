import { Component, OnInit, Inject, Optional } from '@angular/core';
import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  userdetails: any;
  username: any;
  constructor(private commonServiceService:CommonServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<UnauthorizedComponent>) { }

  ngOnInit() {
    console.log('uuuuuuuuuuuu', this.data);
    
    this.userdetails = this.commonServiceService.getUserDetails();
    if (this.userdetails) {
      this.username = this.userdetails.firstName;
    }
  }

  

}
