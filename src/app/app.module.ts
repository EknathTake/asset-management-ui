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
import {MessageDialogComponent} from './shared/message-dialog/message-dialog.component';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './material/material.module';
import {RequestLogInterceptor} from './shared/request-log-interceptor';
import {ExcelService} from './services/excel.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageDialogComponent
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
  providers: [CookieService, ExcelService, {provide: HTTP_INTERCEPTORS, useClass: RequestLogInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
