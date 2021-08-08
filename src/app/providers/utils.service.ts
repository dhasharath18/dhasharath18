import { Injectable } from '@angular/core';
import { LoadingController,AlertController } from '@ionic/angular'; 
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loading:any;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController) { }

   
    async presentAlert(head,body) {
      const alert = await this.alertController.create({
        header: head,
        message: body,
        buttons: ['OK'],
      });
      await alert.present();
    }
    

    async loadingPresent() {
      this.loading = true;
      return await this.loadingController.create({
        message: 'Please wait ...',
        spinner: 'circles' ,
        duration: 60000
      }).then(a => {
        a.present().then(() => {
          if (!this.loading) {
            a.dismiss().then();
          }
        });
      });
    }
  
    async loadingDismiss() {
      this.loading = false;
      return await this.loadingController.dismiss().then();
    }
}
