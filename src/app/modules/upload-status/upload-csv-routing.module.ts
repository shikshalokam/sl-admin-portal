import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersCsvComponent } from './users-csv/users-csv.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list', component: UsersCsvComponent, data: { title: [{ name: 'Home', link: '/home' },
         { name: 'UploadRecords', link: '/uploadrecords/list' }] },
      },
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadCSVRoutingModule { }
