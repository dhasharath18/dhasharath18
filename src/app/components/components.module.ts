import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
const PAGES_COMPONENTS = [
    HeaderComponent,
    FooterComponent
   
  ];
@NgModule({
    declarations: [PAGES_COMPONENTS],
    exports: [PAGES_COMPONENTS],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot(),
    ],
})
export class ComponentsModule{

}