import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ReciptService} from '../../providers/recipt.service';
import {UtilsService} from '../../providers/utils.service';
@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {

  months;
  paymentMode;
  receiptData;
  headerData={ title:'Receipts', year_id:0};
  constructor(
    private storage: Storage,
    private receiptservice:ReciptService,
    public utils: UtilsService) { }

  ngOnInit() {
   
    this.getReceipts()
  }
  getReceipts() {
    this.utils.loadingPresent();
    this.storage.get('userid').then((uid) => {
      this.storage.get('academic_id').then((aid) => {
        let Obj = {
          userid: uid,
          activeAY: aid
        }
        this.receiptservice.getFeeReceiptsDetails(Obj).subscribe((result) => {
          this.utils.loadingDismiss();
          this.receiptData = result.receipts_data;
          this.paymentMode = result.payment_modes;
          this.months = result.academic_months;
        });
      });
    })
  }


}
