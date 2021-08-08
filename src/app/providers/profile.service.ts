import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import *  as AppConfig from '../../app/serverCalls';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private cfg: any;

  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }
  getProfile(profile): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url+ "get_children", profile, httpOptions)
      .pipe(map((response: Response) => response))
  }
}
