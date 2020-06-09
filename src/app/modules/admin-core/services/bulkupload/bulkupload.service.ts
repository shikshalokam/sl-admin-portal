import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { UploadConfig } from './bulkupload.config';

@Injectable({
  providedIn: 'root'
})
export class BulkuploadService {

  constructor(private Http: HttpClient) { }


  // To get the upload list based on the user logged in
  uploadList(data, searchfield, status, type) {
    return this.Http.get(environment.base_url + UploadConfig.bulkUploadRequest + '?limit=' + data.size + '&page=' + data.page 
    + '&search=' + searchfield + '&status=' + status + '&requestType=' + type);
  }


  // get download list 
  getDownloadLinks(reqId, type) {
    return this.Http.get(environment.base_url + UploadConfig.downloadLinks + reqId + '?fileType=' + type );
  }

   // get Request types 
   getRequestTypes() {
    return this.Http.get(environment.base_url + UploadConfig.getTypes);
  }

  // get status 
  getStatus() {
    return this.Http.get(environment.base_url + UploadConfig.getStatus);
  }

}
