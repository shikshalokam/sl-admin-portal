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

  getUserForm() {
    return this.Http.get(environment.base_url + UsersConfig.usersForm);
  }

  // To get the orginsations based on the user logged in
  getOrganisations() {
    return this.Http.get(environment.base_url + UsersConfig.organisations);
  }

  getDownloadUsers() {
    return this.Http.get(environment.base_url + '/admin-service/api/v1/organisations/downloadUsers/0125747659358699520?limit=90&page=0');
  }


  // To get the orginsations based on the user logged in
  getUsers(data, orgid, searchfield) {
    console.log('getUsers', data, orgid, searchfield)
    // /admin-service/api/v1/organisations/users/0125747659358699520?pageSize=20&pageNo=0&search=Midlaj
    // return this.Http.get(environment.base_url + '/admin-service/api/v1/organisations/users/'+ orgid + params, { headers })

    return this.Http.get(environment.base_url + '/admin-service/api/v1/organisations/users/' + orgid + '?limit=' + data.size + '&page=' + data.page + '&search=' + searchfield);
    // return this.Http.get(environment.base_url + UsersConfig.userslist);
  }

  getUsers1(params) {
    return this.Http.get(environment.base_url + UsersConfig.userslist);
  }


  getUserRoles() {
    return this.Http.get(environment.base_url + UsersConfig.userroles)
  }

  createUser(data) {
    return this.Http.post(environment.base_url + UsersConfig.createuser, data)
  }

  async loadAccountList() {
    return new Promise((resolve, reject) => {
        this.Http.get(environment.base_url + UsersConfig.userroles)
            .toPromise()
            .then(
                res => {
                  console.log('loadAccountList', res);
                  resolve(res);
                    // this.results = res.json().results;
                    // resolve(res.json().results);
                },
                msg => {
                    reject(msg);
                }
            );
    });

}

  // To store data here
  sendMessage(message: string) {
    this.subject.next({ text: message });
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


  // To Clear the stored data
  clearMessage() {
    this.subject.next();
  }

  //  To pass the data to other component
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getCurrentUserRoles() {
    let promise = new Promise((resolve, reject) => {
      this.Http.get(environment.base_url + UsersConfig.userroles)
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
