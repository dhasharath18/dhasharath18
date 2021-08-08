import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import *  as AppConfig from '../../app/serverCalls';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

 
  private cfg: any;
  
  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }
  chatData(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url+"list_chat", data, httpOptions)
      .pipe(map((response: Response) => response))
  }
  
  postMessage(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url+'add_chat', data, httpOptions)
      .pipe(map((response: Response) => response))
  }
}
