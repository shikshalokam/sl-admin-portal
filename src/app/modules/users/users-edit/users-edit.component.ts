import { CommonServiceService } from '../../admin-core/services/common-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../admin-shared/confirm-dialog/confirm-dialog.component';
import { UsersService } from '../../admin-core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RolesEditComponent } from '../roles-edit/roles-edit.component';




@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  displayedColumns: string[] = ['organisation', 'Roles', 'Action']

  makeEnable: boolean = true;
  // -------------------------------

  productGroup: FormGroup;
  variantsArray: FormArray;
  typesOptionsArray: string[][] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  //---------------------------------------------


  editUserDetails: any;
  details: any;
  panelOpenState: boolean = false;
  confirmPopupResult: any;
  visible = true;
  selectable = true;
  removable = true;
  load: boolean = false;
  makedisable: boolean = true;
  // separatorKeysCodes: number[] = [ENTER, COMMA];
  roleCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  roles: string[] = [];
  filterValue: any;
  userId: any;

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(private commonServiceService: CommonServiceService,
    private _snackBar: MatSnackBar, private dialog: MatDialog,
    private usersService: UsersService, private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUserDetails();
    this.productGroup = this.fb.group({
      name: '',
      variants: this.fb.array([
        this.fb.group({
          type: '',
          options: ''
        })
      ]),
    });

  }

  reset() {
    this.commonServiceService.commonSnackBar('Comming soon', 'Dismiss', 'top', '10000');
  }

  // User Details
  getUserDetails() {
    this.usersService.singleUserDetails(this.userId).subscribe(data => {
      this.editUserDetails = data['result'];
      this.details = this.editUserDetails.organisations;
      this.editUserDetails.roleslist = []
      for (let i = 0; i < this.details.length; i++) {
        this.details[i].list = [];
        for (let j = 0; j< this.details[i].roles.length; j++){
          this.details[i].list.push(this.details[i].roles[j].label);
        }
      }
      this.load = true;
      this.typesOptionsArray.push(this.editUserDetails.organisations[0].roles);
      this.roles = this.editUserDetails.organisations[0].roles;
      this.filteredRoles = this.roleCtrl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => role ? this._filter(role) : this.editUserDetails.roles.slice()));
    }, error => {
      this.commonServiceService.commonSnackBar(error.error.message.params.errmsg, 'Dismiss', 'top', 1000)
    })
  }

  editPersonalData() {

  }

  editRoles(id) {
    console.log('roles', id, this.roles);
  }

  // In activate
  inActivateDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        this.blockUser();
      } else {
        this.dialog.closeAll();
      }

    });
  }

  // activate
  activateDialog() {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmPopupResult = dialogResult;
      if (this.confirmPopupResult) {
        this.unBlockUser();
      } else {
        this.dialog.closeAll();
      }

    });
  }

  // Block User
  blockUser() {
    this.usersService.blockUser(this.userId).subscribe(data => {
      this.commonServiceService.commonSnackBar('User Blocked', 'Dismiss', 'top', '10000');
    }, error => {
      console.log('blockUser', error);
    })
  }

  // Block User
  unBlockUser() {
    this.usersService.unBlockUser(this.userId).subscribe(data => {
      this.commonServiceService.commonSnackBar('User Blocked', 'Dismiss', 'top', '10000');
    }, error => {
      console.log('blockUser', error);
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our role
    if ((value || '').trim()) {
      this.roles.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.roleCtrl.setValue(null);
  }

  remove(role: string): void {
    const index = this.roles.indexOf(role);
    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  // remove(role: string, index: number): void {
  //   const optIndex = this.roles[index].indexOf(role);
  //   // const index = this.roles.indexOf(role);

  //   if (optIndex >= 0) {
  //     this.roles.splice(index, 1);
  //   }
  // }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('seeeeeee', event);
    this.roles.push(event.option.value);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  private _filter(value) {
    if (typeof (value) == 'object') {
      this.filterValue = value.label.toLowerCase();
    } else {
      this.filterValue = value.toLowerCase();
    }

    return this.editUserDetails.roles.filter(role => role.label.toLowerCase().indexOf(this.filterValue) === 0);
  }


  // ---------------------------------------
  saveProduct(form: FormGroup) {
    console.log('1111111111111111111', form);
  }

  // Add new item to FormArray
  addItem(): void {
    this.variantsArray = this.productGroup.get('variants') as FormArray;
    this.variantsArray.push(this.fb.group({
      type: '',
      options: ''
    }));

    this.typesOptionsArray.push([]);
  }

  removeItem(index: number) {
    this.variantsArray.removeAt(index);
  }

  addOpt(event: MatChipInputEvent, index: number): void {
    console.log('aaaadopt', index);
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.typesOptionsArray[index].push(value.trim());

    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeOpt(opt: string, index: number): void {
    const optIndex = this.typesOptionsArray[index].indexOf(opt);
    if (optIndex >= 0) {
      this.typesOptionsArray[index].splice(optIndex, 1);
    }
  }



  // --------------------------------------------------------


  Edit(data) {
    const finaldata = []
    finaldata.push(this.editUserDetails);
    finaldata.push(data);
    const dialogRef = this.dialog.open(RolesEditComponent, {
      disableClose: true,
      width: '30%',
      data: finaldata
    });
  }

  newOrganisation() {
    this.commonServiceService.commonSnackBar('Comming soon', 'Dismiss', 'top', '1000')
  }

}
