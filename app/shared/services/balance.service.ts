import { Injectable, OnInit } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable()
export class BalanceService {

  private serverUrl = "http://ezbanking.gear.host/api/Money/Balance";
  private balance: number = -1;

  constructor(private http: HttpClient) { 
  }
    
  getBalance(): number { 
    this.getData()
      .subscribe((result: Response|any) => {
        const body = result.json() || "";
        const json = JSON.stringify(body);
        this.balance =  json["balance"];
        console.dir(json);
      }, (error: Response|any) => {
        const body = error.json() || "";
        const err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
      });
      return this.balance;
  }

  getData() {
      let headers = this.createRequestHeader();
      return this.http.get(this.serverUrl, { headers: headers });
  }

  getResponseInfo() {
      let headers = this.createRequestHeader();
      return this.http.get(this.serverUrl, { headers: headers });
  }

  private createRequestHeader() {
      // set headers here e.g.
      let headers = new HttpHeaders({
          //"AuthKey": "my-key",
          //"AuthToken": "my-token",
          "Content-Type": "application/json",
       });

      return headers;
  }
  
}