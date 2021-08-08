import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeinfoPage } from './feeinfo.page';

const routes: Routes = [
  {
    path: '',
    component: FeeinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeinfoPageRoutingModule {}
