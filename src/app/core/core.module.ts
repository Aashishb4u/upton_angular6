import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import {
    ApiService,
    UserService,
    EventService
} from './services';
import {Helper} from "./helpers/helper";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    UserService,
    Helper,
    EventService
  ],
  declarations: []
})
export class CoreModule { }
