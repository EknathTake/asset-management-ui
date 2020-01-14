import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';


@NgModule({
  declarations: [AddEmployeeComponent,
    ListEmployeeComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    CommonModule
  ]
})
export class EmployeeModule {
}
