import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../providers/utils.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import {PaymentsnewService} from '../../providers/paymentsnew.service';
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-paymentsnew',
  templateUrl: './paymentsnew.page.html',
  styleUrls: ['./paymentsnew.page.scss'],
})
export class PaymentsnewPage implements OnInit {

  headerData = { title: 'Payments', year_id: 0 }
  monthsData: Array<any> = [];
  studentId;
  amount;
  selectedMonth;
  academicId;
  feeTypes: Array<any> = [];
  terms;
  FeeData;
  paymentAmount = 0;
  selectedTerm;
  selectedFeeType;
  userid;
  feeInfoData;
  fdata;
  selectedfType;
  compareWith;

  constructor(
    public paymentService: PaymentsnewService,
    private storage: Storage,
    public utils: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.payment();
    this.getFeeInfoData();
  }

    ngOnInit() {
      this.getFeeType();
    }

  payment() {
    this.storage.get("data").then((rdata) => {
      this.storage.get("academic_id").then((aid) => {
        if (aid < 6) {
          this.router.navigateByUrl("/menu/payments");
        } else {
          let data = JSON.parse(rdata);
          let feeDetails = data ? data.fee_data : {};
          if (feeDetails) {
            let cval;
            for (let key in feeDetails) {
              let value = feeDetails[key];
              if (value.due > 0 && !cval) {
                cval = value;
              }

            }
            if (cval) {
              if (cval.ay_id < 6) {
                this.storage.set('academic_id', cval.ay_id).then(() => {
                  this.router.navigateByUrl("/menu/payments");
                })
              } else if (cval.ay_id < aid) {
                this.storage.set('academic_id', cval.ay_id).then(() => {
                  location.reload();
                })
              }
            }
          }
        }
      })
    });
  }
  
    

 getFeeInfoData(){
   this.route.queryParams.subscribe(params => {
     if (this.router.getCurrentNavigation().extras.state) {
       this.fdata = this.router.getCurrentNavigation().extras.state.user;
       if (this.fdata) {
         this.feeInfoData = this.fdata;
         this.paymentAmount = this.fdata.amount;
         this.selectedFeeType = this.fdata.ftype;
         this.selectedTerm = this.fdata.term;
       } else {
         this.feeInfoData = { ftype: '', term: '' };
       }
     }
   })
  }
 
  compareWithFn(o1, o2) { 
    return o1 == o2;
  };

  getFeeType() {
    this.storage.get('userid').then((uid) => {
      this.storage.get('academic_id').then((aid) => {
        let feeTypeObj = {
          userid: uid,
          activeAY: aid
        }
        this.paymentService.getFeeTypeDetails(feeTypeObj).subscribe((result) => {
          this.FeeData = result.fee_data;
         this.compareWith = this.compareWithFn
          this.studentId = result.student_id;
          let keys = [];
          for (let key in result.fee_data) {
            if (result.fee_data.hasOwnProperty(key)) {
              keys.push({ key: key, value: result.fee_data[key] });
            }
          }
          this.feeTypes = keys;
          if (this.feeInfoData.ftype) {
            this.terms = typeof this.FeeData[this.feeInfoData.ftype] == 'object' ? this.FeeData[this.feeInfoData.ftype].terms_data : [];
           }
        });
      });
    })
  }

  changeFeeType(e) {
    this.terms = typeof this.FeeData[e] == 'object' ? this.FeeData[e].terms_data : [];
    this.selectedFeeType = e;
  }

  changeMonth(e) {
    let key = e - 1;
    this.paymentAmount = this.terms[key].pay;
    this.selectedTerm = e;
  }

pay() {
  this.utils.loadingPresent()
  this.storage.get('userid').then((id) => {
    this.storage.get('academic_id').then((aid) => {
      let paymentObj = {
        student_id: this.studentId,
        userid: id,
        term: this.selectedTerm,
        fee_type:this.selectedFeeType,
        activeAY: aid,
        amount: this.paymentAmount
      }
      this.paymentService.postPayment(paymentObj).subscribe((result) => {
        this.utils.loadingDismiss()
        if (result) {
          if (result.status == "OK") {
            this.confirmPay(result.data)
          }
        }
      })
    })
  })
}



confirmPay(payment_details) {
  var options = {
    description: payment_details.description,
    currency: 'INR',
    key: payment_details.rkey,
    order_id: payment_details.order_id,
    amount: payment_details.amount*100,
    name: payment_details.name,
    prefill: payment_details.prefill,
    notes: payment_details.notes,
  }
  var successCallback =  (success)=> {
    this.utils.loadingPresent()
    let successObj={
    //  action:'update_order',
      order_id:success.razorpay_order_id,
      payment_id:success.razorpay_payment_id
    }
    this.paymentService.postSuccess(successObj).subscribe((result)=>{
      this.utils.loadingDismiss();
      if(result){
        if(result.status=="OK"){
          this.utils.presentAlert("Success",result.msg)
          this.router.navigateByUrl("/menu/receipts");
        }else{
          this.utils.presentAlert("Oops",result.error)
          this.router.navigateByUrl("/menu/paymentsnew");
        }
      }
    })
    // var orderId = success.razorpay_order_id
    // var signature = success.razorpay_signature
  }

  var cancelCallback = function (error) {
    this.utils.presentAlert("Oops!",error.description)
    // alert(error.description + ' (Error ' + error.code + ')')
  }

  RazorpayCheckout.on('payment.success', successCallback)
  RazorpayCheckout.on('payment.cancel', cancelCallback)
  RazorpayCheckout.open(options)
}

}
