import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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

  // To get the subentity List
  getSubEntityList(entityId, entityType, searchField, data) {
    return this.Http.get(environment.base_url + EntityConfig.subEntityList + entityId + '?type='
      + entityType + '&limit=' + data.size + '&page=' + data.page + '&search=' + searchField);
  }

  // To get the entity details
  getEntityDetails(entityId) {
    return this.Http.get(environment.base_url + EntityConfig.entityDetails + entityId);
  }

  // To get the related entities data
  getRelatedEntities(entityId) {
    return this.Http.get(environment.base_url + EntityConfig.relatedEntities + entityId);
  }

  // To get state creation dynamic form
  getStatesForm() {
    return this.Http.get(environment.base_url + EntityConfig.stateForm);
  }

  // sample entity csv data to download
  sampleEntityCSV() {
    return this.Http.get(environment.base_url + EntityConfig.sampleEntityCSV);
  }

  // sample entity mapping csv data to download
  sampleEntityMappingCSV() {
    return this.Http.get(environment.base_url + EntityConfig.sampleEntityMappingCSV);
  }

  // create state 
  createState(data) {
    return this.Http.post(environment.base_url + EntityConfig.createState, data);
  }


  // To upload the entity csv
  uploadEntityCsv(entityData, file) {
    let fileData = new FormData();
    fileData.append('uploadFile', file);
    return this.Http.post(environment.base_url + EntityConfig.bulkUploadEntity
      + '&entityType=' + entityData.entitytype + '&state =' + entityData.state, fileData)
  }

  // To upload the entity mapping csv
  uploadEntityMappingCsv(entityMapData, file) {
    let fileData = new FormData();
    fileData.append('uploadFile', file);
    return this.Http.post(environment.base_url + EntityConfig.bulkUploadEntityMapping
      + '&programId=' + entityMapData.programId + '&solutionId=' + entityMapData.solutionId, fileData)
  }

  // To get the states list
  getStatesList() {
    return this.Http.get(environment.base_url + EntityConfig.stateList);
  }

  // To get the entity list
  getEntityList() {
    return this.Http.get(environment.base_url + EntityConfig.entityTypeList);
  }
}
