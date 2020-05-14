import { Component, OnInit, Optional, Inject } from '@angular/core';
import { UsersService } from '../../admin-core';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { saveAs as importedSaveAs } from "file-saver";



@Component({
  selector: 'app-add-multiple-users',
  templateUrl: './add-multiple-users.component.html',
  styleUrls: ['./add-multiple-users.component.scss']
})
export class AddMultipleUsersComponent implements OnInit {
  filecontent: any;
  downloadurl: 'download url from server';
  constructor(private usersService: UsersService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddMultipleUsersComponent>
  ) { }

  ngOnInit() {
  }

  downloadSample() {
    this.downLoadFile(this.data.downloadedData, '"text/csv"');
  }

  // To download selected records
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    importedSaveAs(blob, 'Sample.csv');
    // let url = window.URL.createObjectURL(blob);
    // let pwa = window.open(url);
    this._snackBar.open('Sample File Downloaded Successfully', 'success', {
      duration: 10000,
      verticalPosition: 'top'
    })
  }

  // File Handling
  handleFileInput(files: Event) {
    const file = files[0];
    this.uploadUsersCSVFile();
    this.filecontent = file;
  }

  // Sendind csv to service
  uploadUsersCSVFile() {
    if (this.filecontent) {
      this.usersService.uploadUsersCsv(this.filecontent).subscribe(res => {
        if (res.status === 'sucess') {

        } else {

        }
      }, err => {
        console.log('uploadUsersCSVFile error', err);
      });
    } else {
      this._snackBar.open('Please Select the File', 'error', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
