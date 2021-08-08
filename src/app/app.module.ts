import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PopoverComponent} from './components/popover/popover.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {Network} from '@ionic-native/network/ngx';
import {ComponentsModule} from './components/components.module';
import { AppVersion } from '@ionic-native/app-version/ngx';
@NgModule({
  declarations: [AppComponent,PopoverComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
     IonicModule.forRoot(),
      AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy,
     useClass: IonicRouteStrategy },
     StatusBar,
     Network,
     AppVersion,
     SplashScreen],
  bootstrap: [AppComponent],
})
export class AppModule {}
