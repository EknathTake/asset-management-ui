import { NgModule } from '@angular/core';
import { AssetEntryComponent } from './asset-entry/asset-entry.component';
import { AssetHistoryComponent } from './asset-history/asset-history.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { AssetSummaryComponent } from './asset-summary/asset-summary.component';
import {AssetService} from '../services/asset.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule, DatePipe} from '@angular/common';
import {ConfirmService} from '../services/confirm.service';
import {ConfirmBoxComponent} from '../shared/confirm-box/confirm-box.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetHomeComponent } from './asset-home/asset-home.component';
import { AssetAssignComponent } from './asset-assign/asset-assign.component';



@NgModule({
  declarations: [AssetEntryComponent, AssetHistoryComponent, AssetSummaryComponent, AssetListComponent, AssetHomeComponent, AssetAssignComponent],
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
  providers: [AssetService, DatePipe, ConfirmService]
})
export class AssetModule { }
