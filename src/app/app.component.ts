import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public platform:Platform,
    private statusBar:StatusBar,
    private toastController:ToastController,
    private network:Network,
    private storage:Storage,
    private router:Router,
    private splashScreen:SplashScreen
  ) {
    this.initializeApp();
    this.checkNetwork();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#3880ff');
      this.storage.get("userid").then((uid) => {
        if (uid) {
          this.router.navigateByUrl("/menu/profile")
        } else {
          this.router.navigateByUrl("/login")
        }
      })
      this.splashScreen.hide();
  }
    );
}
async presentToast(text,clr) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000,
    color:clr
  });
  toast.present();
}

checkNetwork() {
  this.network.onDisconnect().subscribe(()=>{
    this.presentToast('Internet connection lost!','warning')
  });
  this.network.onConnect().subscribe(()=>{
    setTimeout(()=>{
      this.presentToast(this.network.type+' connected','success')
    },2000)
  })
}
}
