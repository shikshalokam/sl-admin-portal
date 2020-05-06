import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
ActivatedRoute
@Component({
  selector: 'app-organisation-edit',
  templateUrl: './organisation-edit.component.html',
  styleUrls: ['./organisation-edit.component.scss']
})
export class OrganisationEditComponent implements OnInit {
  crumData: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route
      .data
      .subscribe(data => {
        this.crumData = data;
      });
  }

}
