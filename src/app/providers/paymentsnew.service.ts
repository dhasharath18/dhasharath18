import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import *  as AppConfig from '../../app/serverCalls';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaymentsnewService {

  private cfg: any;

  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }
  getFeeTypeDetails(payment): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url + "get_fee_data", payment, httpOptions)
      .pipe(map((response: Response) => response))
  }
  postPayment(payment): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url + 'create_order_new', payment, httpOptions)
      .pipe(map((response: Response) => response))
  }
  postSuccess(payment): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url+ 'update_order', payment, httpOptions)
      .pipe(map((response: Response) => response))
  }
}