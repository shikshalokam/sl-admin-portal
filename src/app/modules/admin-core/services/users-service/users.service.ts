import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private Http: HttpClient) { }

  getUserForm() {
    return this.Http.get(environment.base_url + '/admin-service/api/v1/user-creation/getForm');
  }

  getUserRoles() {
    return this.Http.get(environment.base_url + '/admin-service/api/v1/platform-user-roles/getProfile')
  }

  createUser(data) {
    return this.Http.post(environment.base_url + '/admin-service/api/v1/user-creation/create', data)
  }


  toFormGroup(questions) {
    let group: any = {};
    let validaciones = [];
    questions.forEach(question => {
      group[question.field] = question.validation.required ?
        new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
      // if (question.required) {
      //   validaciones.push(Validators.required);
      // }
      // if (question.number) {
      //   validaciones.push(Validators.pattern(/^([0-9])*$/));
      // }
      // group[question.key] = new FormControl(question.value || '', validaciones);
      // validaciones = [];
    });
    return new FormGroup(group);
  }

}
