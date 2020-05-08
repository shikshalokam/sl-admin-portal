import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganisationService, CommonServiceService } from '../../admin-core';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared';
import { MatDialog } from '@angular/material';
import { OrganisationEditModalComponent } from '../organisation-edit-modal/organisation-edit-modal.component';


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
  assignedStatus: any;
  formdata: any;
  fieldsForOrganisation: any;
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
    this.createOrganisationForm();
  }

  // User Details
  getOrganisationDetails() {
    this.organisationService.organisationDetails(this.organisationId).subscribe(data => {
      this.editOrganisationDetails = data['result'];
      console.log(' this.editOrganisationDetails', this.editOrganisationDetails);

    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 1000)
    })
  }

  // confirmDialog
  confirmDialog(): void {
    const message = `Are you sure you want to do this action ?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "310px",
      height: "200px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        this.activate_deActivate_Organisation(this.editOrganisationDetails);
      } else {
        this.dialog.closeAll();
      }
    });
  }

  // activate and deActivate User
  activate_deActivate_Organisation(data) {
    if (data.status === 'Active') {
      this.assignedStatus = 0;
    } else {
      this.assignedStatus = 1;
    }
    let updateData = {
      organisationId: this.organisationId,
      status: this.assignedStatus
    }
    this.organisationService.activate_deActivate_Organisation(updateData).subscribe(data => {
      this.commonServiceService.commonSnackBar(data['message'], 'Dismiss', 'top', '10000');
      // this.router.navigateByUrl('users/list');
      this.getOrganisationDetails();
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    })
  }

  // Organisation Form
  createOrganisationForm() {
    this.organisationService.getOrganisationForm().subscribe(data => {
      this.formdata = data['result'];
      this.fieldsForOrganisation = this.formdata;
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 10000);
    });
  }

  editOrganisation(data) {
    this.fieldsForOrganisation.forEach(element => {
      if (data[element.field]) {
        element.value = data[element.field]
      } else {
        element.value = '';
      }
    });
    this.fieldsForOrganisation.organisationId = this.organisationId;
    this.openDialog(this.fieldsForOrganisation);

  }

  // Adding Organisation popup
  openDialog(fieldsForOrganisation): void {
    const dialogRef = this.dialog.open(OrganisationEditModalComponent
      , {
        disableClose: true,
        width: '50%',
        data: { fieldsForOrganisation }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getOrganisationDetails();
    });
  }

}
