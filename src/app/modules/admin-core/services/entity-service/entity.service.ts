import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { EntityConfig } from './entity.config';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private Http: HttpClient) { }

  // To get the states list
  getEntityStatesList(data) {
    return this.Http.get(environment.base_url + EntityConfig.stateEntityList + '?page=' + data.page + '&limit=' + data.size);
  }

  getSubEntityList(entityId, entityType, searchField, data) {
    return this.Http.get(environment.base_url + EntityConfig.subEntityList + entityId + '?type='
      + entityType + '&limit=' + data.size + '&page=' + data.page + '&search=' + searchField);
  }

  getEntityDetails(entityId) {
    return this.Http.get(environment.base_url + EntityConfig.entityDetails + entityId);
  }

  getRelatedEntities(entityId) {
    return this.Http.get(environment.base_url + EntityConfig.relatedEntities + entityId);
  }

  getStatesForm() {
    return this.Http.get(environment.base_url + EntityConfig.stateForm);
  }

  sampleEntityCSV() {
    return this.Http.get(environment.base_url + EntityConfig.sampleEntityCSV);
  }

  createState(data) {
    return this.Http.post(environment.base_url + EntityConfig.createState, data);
  }


  // To upload the entity csv
  uploadEntityCsv(organisation, file) {
    let fileData = new FormData();
    fileData.append('userCreationFile', file);
    return this.Http.post(environment.base_url + EntityConfig.bulkUploadEntity, fileData)
  }

  getStatesList() {
    return this.Http.get(environment.base_url + EntityConfig.stateList);
  }

  getEntityList() {
    return this.Http.get(environment.base_url + EntityConfig.entityTypeList);
  }
}
