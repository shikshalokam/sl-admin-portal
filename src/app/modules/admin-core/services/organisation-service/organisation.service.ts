import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrganisationConfig } from './organisation.config';


@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private Http: HttpClient) { }

  // getting Organisation list 
  organisationList(data, search) {
    console.log('organisationList', data);
    // admin-service/api/v1/organisations/detailList?limit=10&offset=1
    return this.Http.get(environment.base_url + OrganisationConfig.organisationList + '?limit=' + data.size + '&offset=' + data.page + '&search='+ search);
  }

  // getting Organisation form 
  getOrganisationForm() {
    return this.Http.get(environment.base_url + OrganisationConfig.organisationForm);
  }
}
