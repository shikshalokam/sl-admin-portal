import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss']
})
export class AdminFooterComponent implements OnInit {
  footerLink: any;
  constructor() {
    this.footerLink = [
        {
            name: "Copyright @2020 Shikshalokam"
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
