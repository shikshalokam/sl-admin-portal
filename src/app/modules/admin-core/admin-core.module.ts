import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor/interceptor';
import { CustomsearchDirective } from './directives/customsearch.directive';


@NgModule({
  declarations: [CustomsearchDirective],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ]
})
export class AdminCoreModule { }
