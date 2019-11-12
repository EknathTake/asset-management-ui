import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {HomePageComponent} from './user/home-page/home-page.component';
import {AssetEntryComponent} from './asset/asset-entry/asset-entry.component';
import {AssetListComponent} from './asset/asset-list/asset-list.component';
import {AssetSummaryComponent} from './asset/asset-summary/asset-summary.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: LoginComponent
}, {
  path: 'home',
  component: AssetListComponent
}, {
  path: 'asset/create',
  component: AssetEntryComponent
}, {
  path: 'asset/list',
  component: AssetListComponent
}, {
  path: 'asset/summary',
  component: AssetSummaryComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
