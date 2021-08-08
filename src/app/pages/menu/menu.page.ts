import { Component, OnInit } from '@angular/core';
import {Router,RouterEvent} from '@angular/router';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  AppLogo = 'assets/images/logo.png';
  pages: Array<{ title: string, url: string, icon: any }>;
  selectedPath = '';
  academicId;

  constructor(
    private router: Router,
    private storage: Storage) {
    this.storage.get("academic_id").then((aid) => {
      this.academicId = aid;
      this.getPages();
    })
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url
      }
    });
  }

  ngOnInit() { }

  getPages() {
    if (this.academicId && this.academicId < 6) {
      this.pages = [
        { title: 'Profile', url: '/menu/profile', icon: "home" },
        { title: 'Payments', url: '/menu/payments', icon: "cash" },
        { title: 'Receipts', url: '/menu/receipts', icon: "document" },
        { title: 'Chat', url: '/menu/chat', icon: "mail" },
        { title: 'Change Password', url: '/menu/changepassword', icon: "key" }
      ]
    } else {
      this.pages = [
        { title: 'Profile', url: '/menu/profile', icon: "home" },
        { title: 'Payments', url: '/menu/paymentsnew', icon: "cash" },
        { title: 'Fee Info.', url: '/menu/feeinfo', icon: "information-circle" },
        { title: 'Receipts', url: '/menu/receipts', icon: "document" },
        { title: 'Exam Reports', url: '/menu/reports', icon: "albums" },
        { title: 'Chat', url: '/menu/chat', icon: "mail" },
        { title: 'Change Password', url: '/menu/changepassword', icon: "key" }
      ]
    }
  }

}
