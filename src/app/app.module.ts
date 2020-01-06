import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserModule} from './user/user.module';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './material/material.module';
import {RequestLogInterceptor} from './shared/request-log-interceptor';
import {ExcelService} from './services/excel.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    AngularFontAwesomeModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [CookieService, ExcelService, {provide: HTTP_INTERCEPTORS, useClass: RequestLogInterceptor, multi: true}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
