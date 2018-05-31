import { Injectable, OnInit } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BalanceResponse } from "~/shared/interfaces/balance-response";

@Injectable()
export class BalanceService {

  serverUrl = "http://ezbanking.gear.host/api/Money/Balance";
 
  constructor(private http: HttpClient) { 
  }
  
  getBalance(){
    return this.getResponseInfo();
  }
  
  getResponseInfo() {
      let headers = this.createRequestHeader();
      return this.http.get<BalanceResponse>(this.serverUrl, { headers: headers });
  }

  private createRequestHeader() {
      let headers = new HttpHeaders({
          "Content-Type": "application/json",
       });
      return headers;
  }
  
}