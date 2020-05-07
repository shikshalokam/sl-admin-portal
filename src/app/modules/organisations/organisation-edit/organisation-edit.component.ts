import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganisationService, CommonServiceService } from '../../admin-core';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-organisation-edit',
  templateUrl: './organisation-edit.component.html',
  styleUrls: ['./organisation-edit.component.scss']
})
export class OrganisationEditComponent implements OnInit {
  crumData: any;
  organisationId: any;
  editOrganisationDetails: any;
  confirmPopupResult: any;
  constructor(private route: ActivatedRoute, private organisationService: OrganisationService,
    private commonServiceService: CommonServiceService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.organisationId = this.route.snapshot.paramMap.get('id');
    this.getOrganisationDetails();
    this.route
      .data
      .subscribe(data => {
        this.crumData = data;
      });
  }

  // User Details
  getOrganisationDetails() {
    this.organisationService.organisationDetails(this.organisationId).subscribe(data => {
      this.editOrganisationDetails = data['result'];
      console.log(' this.editOrganisationDetails', this.editOrganisationDetails);
      // this.details = this.editUserDetails.organisations;
      // this.editUserDetails.roleslist = []
      // for (let i = 0; i < this.details.length; i++) {
      //   this.details[i].list = [];
      //   for (let j = 0; j < this.details[i].roles.length; j++) {
      //     this.details[i].list.push(this.details[i].roles[j].label);
      //   }
      // }
      // this.editUserDetails.userId = this.userId;
      // this.load = true;
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 1000)
    })
  }

  // confirmDialog
  confirmDialog(): void {
    console.log('cccccccccccccccc');
    const message = `Are you sure you want to do this action ?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "310px",
      height: "200px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;

      console.log('confirmPopupResult', this.confirmPopupResult);
    });
  }

}
