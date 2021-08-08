import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../providers/utils.service';
import {FeeinfoService} from '../../providers/feeinfo.service';
import { Storage } from '@ionic/storage';
import {Router,NavigationExtras} from '@angular/router'
@Component({
  selector: 'app-feeinfo',
  templateUrl: './feeinfo.page.html',
  styleUrls: ['./feeinfo.page.scss'],
})
export class FeeinfoPage implements OnInit {

  headerData={
    title:'Fee-Info',
    year_id:0
  }
  academicid;
  feeType: Array<any> = []; 
  userid;
  pages;

  constructor(
    public feeTypeService:FeeinfoService,
    private storage: Storage,
    private router:Router,
    public utils: UtilsService)
  {
  
  }

  ngOnInit() {
    this.goToProfilepage()
    this.getFeeType()
  }
  goToProfilepage(){
    this.storage.get('academic_id').then((aid)=>{
      if(aid && aid < 6){
        this.router.navigateByUrl("/menu/profile")
      }
    })
  }

  getFeeType() {
    this.utils.loadingPresent();
    this.storage.get('userid').then((uid)=>{
      this.storage.get('academic_id').then((aid) =>{
        let feeTypeObj =  {
           userid: uid,
            activeAY: aid
          }
          this.feeTypeService.getFeeTypeDetails(feeTypeObj).subscribe((result) => {console.log(result)
            this.utils.loadingDismiss();
            let keys = [];
            for (let key in result.fee_data) {
              if (result.fee_data.hasOwnProperty(key)) {
                keys.push({ key: key, value: result.fee_data[key]});
              }
            }
            this.feeType= keys; 
            console.log(this.feeType)
          });
      });
    }) 
    }

  goToPaymentPage(obj) {
    let navigationExtras: NavigationExtras = {
      state: { user: obj }
    };
    this.router.navigate(['/menu/paymentsnew'], navigationExtras);
  }



}
