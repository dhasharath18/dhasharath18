import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../providers/utils.service';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import {PaymentsService} from '../../providers/payments.service';
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})

export class PaymentsPage implements OnInit {

  headerData = { title: 'Payments', year_id: 0};
  monthsData:any;
  months: Array<any> = []
  studentId:any;
  amount:any;
  selectedMonth:any;
  academicId:any;
  userid:any;
  constructor(
    public paymentService: PaymentsService,
    private storage: Storage,
    public utils: UtilsService,
    private router: Router
  ) {
    this.payRefresh()
    this.paymentPage();
  }

  payRefresh() {
    this.storage.get("academic_id").then((aid) => {
      this.academicId = aid
      if (aid > 5) {
        this.router.navigateByUrl('menu/paymentsnew');
      }
      this.headerData.year_id = aid;
    })
  }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.storage.get('userid').then((uid) => {
      this.storage.get('academic_id').then((aid) => {
        let paymentObj = {
          userid: uid,
          activeAY: aid
        }
        this.paymentService.getPaymentDetails(paymentObj).subscribe((result) => {
          this.utils.loadingDismiss();
          this.monthsData = result;
          if (result.months) { this.months = result.months }
          this.studentId = result.student_id;
        })
      })
    })
  }

  onChange(e) {
    let val = e.target.value
    this.selectedMonth = val;
    this.storage.get('academic_id').then((aid) => {
      let amountObj = {
        activeAY: aid,
        student_id: this.studentId,
        month: val
      }
      this.paymentService.getpaymentAmount(amountObj).subscribe((result) => {
        this.utils.loadingDismiss();
        this.amount = result.amount
      })
    })
  }

  paymentPage() {
    this.storage.get("data").then((rdata) => {
      this.storage.get("academic_id").then((aid) => {
        if (aid > 5) {
          this.router.navigateByUrl('menu/paymentnew');
        } else {
          let data = JSON.parse(rdata);
          let feeDetails = data ? data.fee_data : {};
          if (feeDetails) {
            for (let key in feeDetails) {
              let value = feeDetails[key];
              if (value.due > 0 && value.ay_id < aid) {
                this.storage.set('academic_id', value.ay_id);
                this.router.navigateByUrl('menu/payments');
              }
            }
          }

        }
      })
    })
  }

  pay() {
    this.utils.loadingPresent()
    this.storage.get('userid').then((id) => {
      this.storage.get('academic_id').then((aid) => {
        let paymentObj = {
          student_id: this.studentId,
          userid: id,
          month: this.selectedMonth,
          activeAY: aid,
          amount: this.amount
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
      amount: payment_details.amount * 100,
      name: payment_details.name,
      prefill: payment_details.prefill,
      notes: payment_details.notes,

    }
    var successCallback = (success) => {
      this.utils.loadingPresent();
      let successObj = {
        order_id: success.razorpay_order_id,
        payment_id: success.razorpay_payment_id
      }
      this.paymentService.postSuccess(successObj).subscribe((result) => {
        this.utils.loadingDismiss();
        if (result) {
          if (result.status == "OK") {
            this.utils.presentAlert("Success", result.msg)
            this.router.navigateByUrl('menu/receipts');
          } else {
            this.utils.presentAlert("Oops", result.error)
            this.router.navigateByUrl('menu/payments');
          }
        }
      })
      // var orderId = success.razorpay_order_id
      // var signature = success.razorpay_signature
    }

    var cancelCallback = function (error) {
      this.utils.presentAlert("Oops!", error.description)
      // alert(error.description + ' (Error ' + error.code + ')')
    }

    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options)
  }

}
