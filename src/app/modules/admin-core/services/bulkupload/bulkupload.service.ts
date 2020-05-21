import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UploadConfig } from './bulkupload.config';

@Injectable({
  providedIn: 'root'
})
export class BulkuploadService {

  constructor(private Http: HttpClient) { }


  // To get the upload list based on the user logged in
  uploadList(data, searchfield) {
    return this.Http.get(environment.base_url + UploadConfig.bulkUploadRequest + '?limit=' +  data.size + '&page=' + data.page + '&search=' + searchfield );
  }


   // getting Organisation list 
   referenceDetails(refId) {
    return this.Http.get(environment.base_url + UploadConfig.referenceDetails + refId);
  }
}
