import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserModule} from './user/user.module';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MessageDialogComponent} from './shared/message-dialog/message-dialog.component';
import {DataTablesModule} from 'angular-datatables';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './material/material.module';
import {AssetModule} from './asset/asset.module';
import {RequestLogInterceptor} from './shared/request-log-interceptor';

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
    MaterialModule
  ],
  providers: [CookieService, {provide: HTTP_INTERCEPTORS, useClass: RequestLogInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
