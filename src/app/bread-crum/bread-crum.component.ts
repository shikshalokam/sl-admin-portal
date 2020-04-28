import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bread-crum',
  templateUrl: './bread-crum.component.html',
  styleUrls: ['./bread-crum.component.scss']
})
export class BreadCrumComponent implements OnInit {
  breadcrumData: any;
  crumData: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        this.crumData = data;
        console.log('BreadCrumComponent', this.crumData);
      });
  }

}
