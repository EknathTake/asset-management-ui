import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {AssetEntryComponent} from './asset/asset-entry/asset-entry.component';
import {AssetHistoryComponent} from './asset/asset-history/asset-history.component';
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
  component: AssetHistoryComponent
}, {
  path: 'asset/create',
  component: AssetEntryComponent
}, {
  path: 'asset/hostory',
  component: AssetHistoryComponent
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
