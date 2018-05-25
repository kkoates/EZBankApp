import { Injectable } from "@angular/core";
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { isAndroid, isIOS, device, screen } from "platform";

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
  public deviceInformation: DeviceInfo;

  makePayment(amount: number) {
    //get lat/long here
    var location = getCurrentLocation({
      desiredAccuracy: 3,
      updateDistance: 10,
      maximumAge: 20000,
      timeout: 20000
    }).then(
      function(loc) {
        if (loc) {
          console.log(
            "Current location is: " + loc.latitude + "/" + loc.longitude
          );
        }
      },
      function(e) {
        console.log("Error: " + e.message);
      }
    );

    //get deviceID
    this.deviceInformation = new DeviceInfo(
      device.model,
      device.deviceType,
      device.os,
      device.osVersion,
      device.sdkVersion,
      device.language,
      device.manufacturer,
      device.uuid  // note iOS changes when app is re-installed.  Hover over uuid for more info.
    );

    console.log("Device Id is:" + this.deviceInformation.uuid);
  }
}
