import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/modules/admin-shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextboxQuestion } from 'src/app/modules/admin-shared/form/textbox';
import { DropdownQuestion } from 'src/app/modules/admin-shared/form/dropdown';
import { of } from 'rxjs';



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


  toFormGroup(questions: QuestionBase<string>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  getQuestions() {

    let questions: QuestionBase<string>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
