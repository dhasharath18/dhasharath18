import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UtilsService} from '../../providers/utils.service';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {ProfileService} from '../../providers/profile.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ModalController } from '@ionic/angular';
import {AppupdatePage} from '../../modal/appupdate/appupdate.page';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileData;
  headerData = { title: 'Profile', year_id:0 }
  academicId;
  userid;
  Totalfee;
  backButtonSubscription;
  AppName:string;
  PackageName:string;
  VersionCode:string|number;
  VersionNumber:string;
  update

  constructor( 
    private storage: Storage,
    private router:Router,
    private platform:Platform,
    public alertController: AlertController,
    private appVersion: AppVersion,
    private profileService:ProfileService,
    private modalCtrl:ModalController,
    public utils: UtilsService,
    ) {
     this.getVersionDetails()
     }

getVersionDetails(){
  this.appVersion.getVersionNumber().then(value => {
    this.VersionNumber = value;
  }).catch(err => {
    alert(err);
  });
}

  ngOnInit() {
    this.storage.get('userid').then((uid) => {
      if (uid) {
        this.userid = uid;
        this.storage.get("academic_id").then((aid) => {
          if (aid) {
            this.academicId = aid;
            this.getProfile()
          } else{
            this.router.navigateByUrl("login")
          }
        })
      }else{
        this.router.navigateByUrl("login")
      }
    })
  }
  
  ionViewWillEnter(){
    this.backButtonSubscription = this.platform.backButton.subscribe(async()=>{
      navigator['app'].exitApp();
    })
  }
 
  ionViewDidLeave(){
    this.backButtonSubscription.unsubscribe();
  }

  getProfile() {
    this.utils.loadingPresent();
    let profileObj = {
      action: "get_children",
      userid: this.userid,
      activeAY: this.academicId,
     version: this.VersionNumber
    }
    this.profileService.getProfile(profileObj).subscribe((result) => {
      this.utils.loadingDismiss();
      if (result) { 
        if(result.update){
          this.update=result.update;
         this.presentModal()
        }else{
          this.profileData = result.data;
        }
       }
    })
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AppupdatePage,
      cssClass: 'my-modal',
      componentProps: {
        'firstName':  this.update
      }
    });
    return await modal.present();
  }
 
}
