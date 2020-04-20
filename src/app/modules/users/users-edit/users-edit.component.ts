import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../admin-core/services/common-service.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  editUserDetails: any;
  panelOpenState: boolean = false;
  constructor(private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.editUserDetails = this.commonServiceService.showEditUserDetails();
    console.log(' this.editUserDetails', this.editUserDetails);
  }

}
