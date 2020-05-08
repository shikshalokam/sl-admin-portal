import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UsersConfig } from './users.config';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  roles;
  private subject = new Subject<any>();
  constructor(private Http: HttpClient) { }

  // To get the dynamic form
  getUserForm() {
    return this.Http.get(environment.base_url + UsersConfig.usersForm);
  }

  // To get the orginsations based on the user logged in
  getOrganisations() {
    return this.Http.get(environment.base_url + UsersConfig.organisations + '?pageSize=20&pageNo=1');
  }

  // To download users
  getDownloadUsers(data) {
    return this.Http.post(environment.base_url + UsersConfig.downloadUsers, data);
  }


  // To get the orginsations based on the user logged in
  getUsers(data, orgid, searchfield, status) {
    return this.Http.get(environment.base_url + UsersConfig.usersList + orgid + '?limit=' + data.size + '&page=' + data.page + '&search=' + searchfield + '&status=' + status);
  }

  // User creation
  createUser(data) {
    return this.Http.post(environment.base_url + UsersConfig.createUser, data)
  }


  // Roles Update
  updateRoles(data) {
    return this.Http.post(environment.base_url + UsersConfig.updateRoles, data)
  }

  // Roles Update
  addOrganisation_Roles(data) {
    return this.Http.post(environment.base_url + UsersConfig.addRoles, data)
  }

  // Remove User From Organisation
  removeUserFromOrganisation(data) {
    return this.Http.post(environment.base_url + UsersConfig.removeUser, data)
  }



  // Active and deActivate user
  active_deActive_User(userId, user) {
    if (user.status === 0) {
      user.status = 1;
    } else {
      user.status = 0;
    }
    return this.Http.get(environment.base_url + UsersConfig.blockUser + userId + '?status=' + user.status)
  }

  // get details to Edit
  singleUserDetails(id) {
    return this.Http.get(environment.base_url + UsersConfig.singleUser + id)
  }

  async getUserRoles() {
    return new Promise((resolve, reject) => {
      this.Http.get(environment.base_url + UsersConfig.userRoles)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });

  }

  // To upload the Users csv
  uploadUsersCsv(file): Observable<any> {
    let fileData = new FormData();
    fileData.append('files', file);
    return this.Http.post(environment.base_url + '', fileData)
    // let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + 'token' });
    // headers.append('Content-Type', 'multipart/form-data');
    // const req = new HttpRequest('POST', environment.base_url + '',
    //   formData, {
    //   headers: headers
    // });

    // return this.Http.request(req);
  }


  getCurrentUserRoles() {
    let promise = new Promise((resolve, reject) => {
      this.Http.get(environment.base_url + UsersConfig.userRoles)
        .toPromise().then(
          res => { // Success
            this.roles = res['result']['roles'];
            resolve();
          }
        );
    });
    return promise;
  }
}
