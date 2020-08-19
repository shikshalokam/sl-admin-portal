import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrganisationConfig } from './organisation.config';


@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private Http: HttpClient) { }

  // getting Organisation list 
  organisationList(data, search, status) {
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

  // Active organisation
  activateOrganisation(data) {
    return this.Http.get(environment.base_url + OrganisationConfig.activateOrganisation + data._id);
  }

  // deActivate organisation
  deActivateOrganisation(data) {
    return this.Http.get(environment.base_url + OrganisationConfig.deActivateOrganisation + data._id);
  }
  // Update Organisation
  updateOrganisation(data) {
    return this.Http.post(environment.base_url + OrganisationConfig.updateorganisationDetails, data);
  }

}
