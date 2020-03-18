import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MatMenuModule,MatToolbarModule, MatCardModule, MatButtonModule,MatIconModule,
   MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [CommingSoonComponent, UnauthorizedComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule, MatButtonModule,MatIconModule, MatTabsModule 
  ],
  exports: [ MatMenuModule,
    MatToolbarModule,
    MatCardModule, MatButtonModule,MatIconModule, MatTabsModule]
})
export class AdminSharedModule { }
