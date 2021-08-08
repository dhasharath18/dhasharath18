import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppupdatePageRoutingModule } from './appupdate-routing.module';

import { AppupdatePage } from './appupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppupdatePageRoutingModule
  ],
  declarations: [AppupdatePage]
})
export class AppupdatePageModule {}
