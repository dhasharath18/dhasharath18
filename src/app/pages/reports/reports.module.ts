import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReportsPageRoutingModule } from './reports-routing.module';
import {ComponentsModule} from '../../components/components.module';
import { ReportsPage } from './reports.page';
// import {HeaderComponent} from '../../components/header/header.component';
// import {FooterComponent} from '../../components/footer/footer.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // HeaderComponent,
    // FooterComponent,
    ComponentsModule,
    MatExpansionModule,
    IonicModule,
    ReportsPageRoutingModule
  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
