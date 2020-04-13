import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../admin-core';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';


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
    public dialogRef: MatDialogRef<AddMultipleUsersComponent>
  ) { }

  ngOnInit() {
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
