import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UsersService {
  roles;
  constructor(private Http: HttpClient) { }

  getUserForm() {
    return this.Http.get(environment.base_url + '/admin-service/api/v1/user-creation/getForm');
  }

  getUserRoles() {
    return this.Http.get(environment.base_url + '/admin-service/api/v1/platform-user-roles/getProfile')
  }

  createUser(data) {
    console.log('!!!!!!!!!!!!!!!', data);
    return this.Http.post(environment.base_url + '/admin-service/api/v1/user-creation/create', data)
  }

  getCurrentUserRoles() {
    let promise = new Promise((resolve, reject) => {
      this.Http.get(environment.base_url + '/admin-service/api/v1/platform-user-roles/getProfile')
        .toPromise().then(
          res => { // Success
            this.roles = res['result']['roles'];
            resolve();
          }
        );
    });
    return promise;
  }

  toFormGroup(questions) {
    let group: any = {};
    questions.forEach(question => {
      group[question.field] = 
      // new FormControl(true);
      question.visible ? new FormControl(question.value || '', Validators.required): new FormControl(question.value || '');

      question.validation.forEach(valid =>{
        valid.name === 'pattern' ? new FormControl(question.value || '', Validators.pattern("^[A-Za-z]+$/")): new FormControl(question.value || '');
      });

    });
    return new FormGroup(group);
  }

}
