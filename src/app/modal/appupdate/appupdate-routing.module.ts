import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppupdatePage } from './appupdate.page';

const routes: Routes = [
  {
    path: '',
    component: AppupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppupdatePageRoutingModule {}
