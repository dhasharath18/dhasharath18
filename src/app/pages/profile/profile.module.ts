import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import {ComponentsModule} from '../../components/components.module';
import { ProfilePage } from './profile.page';
// import {HeaderComponent} from '../../components/header/header.component';
// import {FooterComponent} from '../../components/footer/footer.component';
@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    // HeaderComponent,
    // FooterComponent,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
