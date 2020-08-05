import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss']
})
export class AdminFooterComponent implements OnInit {
  footerLink: any;
  constructor() {
    const currentyear = new Date().getFullYear();
    this.footerLink = [
      {
        name: "Copyright @" + currentyear +" Shikshalokam"
      },
      {
        name: "Terms of Service"
      },
      {
        name: "Privacy Policy"
      },
      {
        name: "Contact Us"
      }
    ];
  }

  ngOnInit() {
  }

}
