import { TemplateRef, ViewChild,Component, OnInit  } from '@angular/core';

import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.scss']
})
export class CommingSoonComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  constructor(private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.callAPI();
  }

  callAPI() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
                // TODO: Replace the following line with your code.
          this.router.navigate(['/home']);
                console.log('User clicked yes.');
            } else if (result === 'no') {
                // TODO: Replace the following line with your code.
                console.log('User clicked no.');
            }
        }
    })

}

}
