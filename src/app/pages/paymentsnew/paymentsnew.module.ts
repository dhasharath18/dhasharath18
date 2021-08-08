import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsnewPageRoutingModule } from './paymentsnew-routing.module';
import {ComponentsModule} from '../../components/components.module';
import { PaymentsnewPage } from './paymentsnew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    PaymentsnewPageRoutingModule
  ],
  declarations: [PaymentsnewPage]
})
export class PaymentsnewPageModule {}
