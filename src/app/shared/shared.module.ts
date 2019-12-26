import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {AssetModule} from '../asset/asset.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    AssetModule
  ]
})
export class SharedModule { }
