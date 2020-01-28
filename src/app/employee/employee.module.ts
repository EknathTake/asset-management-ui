import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {ConfirmBoxComponent} from '../shared/confirm-box/confirm-box.component';


@NgModule({
  declarations: [
    EmployeeAddComponent,
    EmployeeListComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    CommonModule
  ], entryComponents: [
    ConfirmBoxComponent
  ],
  exports: [
    EmployeeAddComponent, EmployeeListComponent
  ]
})
export class EmployeeModule {
}
