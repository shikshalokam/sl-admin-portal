import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  singleuserForm: FormGroup;
  entityForm: FormGroup;
  submitted = false;
  entitysubmitted = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.singleuserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    this.entityForm = this.formBuilder.group({
      state: ['', Validators.required],
      zone: ['', Validators.required],
      hub: ['', [Validators.required]],
      schoolName: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
    })
  }

  get f() { return this.singleuserForm.controls; }
  get e() { return this.entityForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.onEntitySubmit();
    // stop here if form is invalid
    if (this.singleuserForm.invalid) {
      return;
    }
  }

  onEntitySubmit() {
    this.entitysubmitted = true;
    // this.addSingle();
    if (this.entityForm.invalid) {
      return;
    } 
  }

}
