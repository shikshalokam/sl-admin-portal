import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersCsvComponent } from './users-csv/users-csv.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list', component: UsersCsvComponent, data: { title: [{ name: 'Home >', link: '/home' },
         { name: 'Users >', link: '/users/list' }, { name: 'UploadStatus', link: '/uploadstatus/list' }] },
      },
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadStatusRoutingModule { }
