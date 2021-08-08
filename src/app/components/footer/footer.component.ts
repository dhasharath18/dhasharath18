import { Component, OnInit } from '@angular/core';
import {Router,RouterEvent} from '@angular/router';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  pages: Array<any>;
  academeicaid
  constructor( 
    public router:Router,
    private storage:Storage) {
      this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url
      }
    });}
    selectedPath = '';
  ngOnInit(){
    this.storage.get("academic_id").then((aid)=>{
      this.academeicaid=aid
    })
  }

  gotoPage(page) { 
    this.router.navigateByUrl(page)
  }

}
