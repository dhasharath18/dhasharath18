import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsnewPage } from './paymentsnew.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsnewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsnewPageRoutingModule {}
