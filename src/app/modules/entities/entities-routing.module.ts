import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StateEntityListComponent } from './state-entity-list/state-entity-list.component';
import { ViewEntityDetailsComponent } from './view-entity-details/view-entity-details.component';

const routes: Routes = [
  {
    path: '',
    // data: { title: 'Home' },
    children: [
      {
        path: 'list', component: StateEntityListComponent, data: {
          title: [{ name: 'Home >', link: '/home' },
          { name: 'StateEntity', link: 'entities/list' }
          ]
        },
      },
      {
        path: 'entitydetails/:id', component: ViewEntityDetailsComponent, data: { title: [{ name: 'Home >', link: '/home' },
         { name: 'Entity', link: '/entities/list' }] },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
