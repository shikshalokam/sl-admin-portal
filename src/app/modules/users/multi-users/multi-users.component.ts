import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-users',
  templateUrl: './multi-users.component.html',
  styleUrls: ['./multi-users.component.scss']
})
export class MultiUsersComponent implements OnInit {
  users: User[];
  // drap and drop
  // https://medium.com/@tarekabdelkhalek/how-to-create-a-drag-and-drop-file-uploading-in-angular-78d9eba0b854
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.users = [
      { id: '1', name: 'kiran', email: 'kiran@gmail.com' },
      { id: '2', name: 'tom', email: 'tom@gmail.com' },
      { id: '3', name: 'john', email: 'john@gmail.com' },
      { id: '4', name: 'Frank', email: 'frank@gmail.com' },

    ];
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
    ];
  }


  filesBrowse(data) {
    console.log('==============', data);
  }
  singleuser() {

  }

}

export interface User {
  id;
  name;
  email;
}
