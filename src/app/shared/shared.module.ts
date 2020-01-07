import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {AssetModule} from '../asset/asset.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';



@NgModule({
  declarations: [DialogComponent, ConfirmBoxComponent],
  imports: [
    MaterialModule,
    AssetModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogComponent
  ],
})
export class SharedModule { }
