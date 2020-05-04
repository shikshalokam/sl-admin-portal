import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrganisationConfig } from './organisation.config';
OrganisationConfig

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private Http: HttpClient) { }

  getOrganisationList() {
    return this.Http.get(environment.base_url + OrganisationConfig.usersList);
  }
}
