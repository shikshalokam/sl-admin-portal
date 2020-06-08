import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganisationsListComponent } from './organisations-list/organisations-list.component';
import { OrganisationEditComponent } from './organisation-edit/organisation-edit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list', component: OrganisationsListComponent, data: { title: [{ name: 'Home', link: '/home' }, { name: 'Organisations', link: '/organisations/list' }] },
      },
      {
        path: 'edit/:id', component: OrganisationEditComponent, data: { title: [{ name: 'Home', link: '/home' }, { name: 'Organisations', link: '/organisations/list' }] },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationsRoutingModule { }
