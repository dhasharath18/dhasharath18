import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  storageData;
  category;
  years;

  constructor(private storage:Storage) { }


  ngOnInit() {
    this.getData();
  }

  getData() {
    this.storage.get('data').then((data) => {
      this.storageData = JSON.parse(data);
      this.years=this.storageData.years;
    });
  }

  YearChange(e) {
    this.category = e;
    this.storage.set("academic_id", e);
    location.reload();
  }

}
