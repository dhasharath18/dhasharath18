import { Component, OnInit,Input } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Router} from '@angular/router';
import {NavController} from '@ionic/angular'
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../popover/popover.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() data:any;
  storageYears;
  yeartext;
 
 constructor(
   public storage: Storage,
   private router :Router,
   private navctrl :NavController,
   private popoverController:PopoverController,
 ) {
  }

 ngOnInit(){
  this.getData()
 }
 
getData(){
 this.storage.get('data').then((data) =>{
 let storageData= JSON.parse(data);
 this.storageYears= storageData.years;
 this.storage.get("academic_id").then((aid)=>{ 
      this.data.year_id=aid;
      for (let key in this.storageYears) {
        let value = this.storageYears[key];
        if (value.id == this.data.year_id) {
          this.yeartext = value.year;
        }
      }
     })
       });
     }

     async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        event: ev,
      });
      return await popover.present();
    }
    
    logout() {
       this.storage.remove("userid").then(()=>{
        this.storage.remove("academic_id").then(()=>{
          this.storage.remove("data").then(()=>{
            this.navctrl.navigateBack['/login']
          })
        })
       })
     }

}
