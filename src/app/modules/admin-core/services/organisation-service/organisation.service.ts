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
    return this.Http.get(environment.base_url + OrganisationConfig.organisationList + '?limit=' + data.size + '&page=' + data.page + '&search=' + search + '&status=' + status);
  }

  // getting Organisation form 
  getOrganisationForm() {
    return this.Http.get(environment.base_url + OrganisationConfig.organisationForm);
  }

  // create Organisation
  createOrganisation(data) {
    return this.Http.post(environment.base_url + OrganisationConfig.createOrganisation, data)
  }

  // get details to Edit
  organisationDetails(id) {
    return this.Http.get(environment.base_url + OrganisationConfig.organisationDetails + id)
  }
}
