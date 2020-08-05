import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-sub-entity-details',
  templateUrl: './view-sub-entity-details.component.html',
  styleUrls: ['./view-sub-entity-details.component.scss']
})
export class ViewSubEntityDetailsComponent implements OnInit {
  viewSubEntitymetaData: any;
  relatedEntities: any;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    this.viewSubEntitymetaData = this.data['viewSubEntitymetaData']['metaInformation'];
    this.relatedEntities = this.data['viewSubEntitymetaData']['relatedEntities']
  }

  // To add space between camelcase 
  replaceKeys(data){
    const key = data.replace(/([a-z])([A-Z])/g,`$1 $2`);
    return key;
    
  }

}
