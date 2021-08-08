import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatExpansionModule} from '@angular/material/expansion';
import { FeeinfoPageRoutingModule } from './feeinfo-routing.module';
import {ComponentsModule} from '../../components/components.module';
import { FeeinfoPage } from './feeinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    ComponentsModule,
    FeeinfoPageRoutingModule
  ],
  declarations: [FeeinfoPage]
})
export class FeeinfoPageModule {}
