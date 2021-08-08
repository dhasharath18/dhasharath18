import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReceiptsPageRoutingModule } from './receipts-routing.module';
import {ComponentsModule} from '../../components/components.module';
import { ReceiptsPage } from './receipts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReceiptsPageRoutingModule
  ],
  declarations: [ReceiptsPage]
})
export class ReceiptsPageModule {}
