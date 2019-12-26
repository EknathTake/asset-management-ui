import { NgModule } from '@angular/core';
import { AssetEntryComponent } from './asset-entry/asset-entry.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { AssetSummaryComponent } from './asset-summary/asset-summary.component';
import {AssetService} from '../services/asset.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [AssetEntryComponent, AssetListComponent, AssetSummaryComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [AssetService]
})
export class AssetModule { }
