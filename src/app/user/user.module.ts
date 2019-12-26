import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import {DataTablesModule} from 'angular-datatables';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [LoginComponent, HomePageComponent],
  imports: [
    FormsModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
