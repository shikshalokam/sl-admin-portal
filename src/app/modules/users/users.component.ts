import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { keyCloakService } from '../admin-core';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  singleuserForm: FormGroup;
  entityForm: FormGroup;
  submitted = false;
  userdetails: any;
  entitysubmitted = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private KeycloakService: keyCloakService) {

  }

  ngOnInit() {
    this.userdetails = this.KeycloakService.getCurrentUserDetails();
  }

  handleChange(data) {
    console.log('data clicked', data);
  }

  get f() { return this.singleuserForm.controls; }

  get e() { return this.entityForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.singleuserForm.invalid) {
      return;
    }

  }

  onEntitySubmit() {
    this.entitysubmitted = true;
    this.addSingle();
    if (this.entityForm.invalid) {
      return;
    }
  }

  singleuser(){

  }

  multiuser(){

  }

  addSingle() {
  }

}
