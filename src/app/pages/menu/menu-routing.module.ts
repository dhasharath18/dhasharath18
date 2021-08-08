import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../payments/payments.module').then( m => m.PaymentsPageModule)
      },
      {
        path: 'paymentsnew',
        loadChildren: () => import('../paymentsnew/paymentsnew.module').then( m => m.PaymentsnewPageModule)
      },
      {
        path: 'feeinfo',
        loadChildren: () => import('../feeinfo/feeinfo.module').then( m => m.FeeinfoPageModule)
      },
      {
        path: 'changepassword',
        loadChildren: () => import('../changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
      },
      {
        path: 'receipts',
        loadChildren: () => import('../receipts/receipts.module').then( m => m.ReceiptsPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then( m => m.ReportsPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
