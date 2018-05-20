# EZBankApp

### EZBankApp Coding Exercise

At EZBank we think banking should be simple.  We have a web API that consists of only 2 methods: GET Balance and POST Payment.

-  GET http://ezbanking.gear.host/api/Money/Balance
- POST http://ezbanking.gear.host/api/Money/Payment

To become more familiar with these methods in API version 1 look at our API reference found at:

http://ezbanking.gear.host/swagger/

We need your help building an app.

### Requirements:

Deliver an Android apk and source (fork this repo on github), built using NativeScript and Angular:

- Displays an initial balance from api/Money/Balance
- Allows a user to enter an Amount when making a payment
- Make sure to include the Android device id along with location lat\lng when making a payment using api/Money/Payment
- Manually update the balance after payments are made since the API does not keep track of payments at this time