import { Injectable } from "@angular/core";
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { isAndroid, isIOS, device, screen } from "platform";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PaymentRequest, PaymentResponse } from "~/shared/interfaces/payments"
import * as Geolocation from "nativescript-geolocation";

// NS structure to store device information
class DeviceInfo {
  constructor(
    public model: string,
    public deviceType: string,
    public os: string,
    public osVersion: string,
    public sdkVersion: string,
    public language: string,
    public manufacturer: string,
    public uuid: string
  ) {}
}



@Injectable()
export class PaymentService {
  serverUrl = "http://ezbanking.gear.host/api/Money/Payment";

  public paymentSuccess: boolean;
  public deviceInformation: DeviceInfo;
  public latitude: number = 0;
  public longitude: number = 0;
  public req: PaymentRequest = new PaymentRequest();
  public amountPaid: number = 0;

  constructor(private http: HttpClient) {  
  }

  public makePayment(amount: number) {
    this.getDeviceInfo();
    
    return this.getLocation()
    .then ( p => {
      this.req.amount = amount;
      this.req.deviceId = this.deviceInformation.uuid;
      this.req.locationLat = p.latitude.toString();
      this.req.locationLng = p.longitude.toString();  
      console.log ('request amt = ' + this.req.amount + ', uuid = ' + this.req.deviceId + ', lat= ' + this.req.locationLat + ', long =' + this.req.locationLng);
      
      return this.getResponseInfo();
    });
  }

  private getLocation(){
    return getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 5000});
    //get lat/long here
    /*var location = getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 5000})
    .then(
      function(loc) {
        if (loc) {
          this.setLatLong(loc.latitude,loc.longitude);
          console.log("Current location is: " + this.latitude + "/" + this.longitude);          
        }
      },
      function(e) {
        console.log("Error: " + e.message);
      }
    );
    */
  }

  private getDeviceInfo() {
    // note iOS changes when app is re-installed.  Hover over uuid for more info.
    this.deviceInformation = new DeviceInfo(device.model, device.deviceType, device.os, device.osVersion, device.sdkVersion, device.language, device.manufacturer, device.uuid );
    console.log("Device Id is:" + this.deviceInformation.uuid);
  }
 
  private setLatLong(latitude: number, longitude: number){
    this.latitude = latitude;
    this.longitude = longitude;
  }
  private getResponseInfo() {
    let headers = this.createRequestHeader();
    return this.http.post<PaymentResponse>(this.serverUrl, this.req, { headers: headers });
  }

  private createRequestHeader() {
      let headers = new HttpHeaders({
          "Content-Type": "application/json",
      });
      return headers;
  }

}
