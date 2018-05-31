import { Component, OnInit } from "@angular/core";
import { BalanceService } from "./shared/services/balance.service";
import { PaymentService } from "./shared/services/payment.service";
import { BalanceResponse } from "~/shared/interfaces/balance";
import { PaymentResponse } from "~/shared/interfaces/payments";
import * as dialogs from "ui/dialogs";

@Component({
  selector: "my-app",
  providers: [BalanceService, PaymentService],
  template: `
    <StackLayout>
      <ActionBar title="My Account" class="action-bar"></ActionBar> 
      <StackLayout class="p-20" orientation="vertical">
        <Label [text]="accountName" class="h1 text-center"></Label>
        <StackLayout orientation="horizontal">
          <Label text="Balance:" class="h2"></Label>
          <TextField [(ngModel)]="accountBalance" class="h2 text-center" width="80%"></TextField>
        </StackLayout>
      </StackLayout>
      <TextField hint="Enter Amount" [(ngModel)]="paymentAmount" keyboardType="number"></TextField>
      <Button text="Make A Payment" (tap)="makePayment()"></Button>
    </StackLayout>
    <!--
    <ActivityIndicator [busy]="isLoading" row="1" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>
    -->
  `
})
export class AppComponent {

  //figure out how to get this working in [([ngModel])]
  accountName: string = "Unknown Account";
  accountBalance: number  = 1;
  paymentAmount: number = 0;
  isLoading: boolean = false;

  constructor( 
    private balanceService: BalanceService, 
    private paymentService: PaymentService) 
  {
    this.accountBalance = 0;
    this.accountName = "Basic Checking";
    this.isLoading = false;

    this.getBalance();
  }

   getBalance(){
    this.accountBalance = null; 
    this.balanceService.getBalance()
    .subscribe ((response: BalanceResponse) => {
      //console.dir(response);
      this.accountBalance = response.balance.amount;
    });
  }

  makePayment(){
    this.paymentService.makePayment(this.paymentAmount)
    .then ( (result) => {
      result.subscribe ( (response) => {
        if (response.ok ===true){
          console.dir(response);
          dialogs.alert('Made successful payment of $ ' + response.payment.amount);  
        } else{
          dialogs.alert('payment failed');  
        }
      });
    });
  }

}