import { Component, OnInit } from "@angular/core";
import { BalanceService } from "./shared/services/balance.service";
import { PaymentService } from "./shared/services/payment.service";

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
          <Label [text]="accountBalance" class="h2 text-center"></Label>
        </StackLayout>
      </StackLayout>
      <TextField hint="Enter Amount" keyboardType="number"></TextField>
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
  accountBalance: number  = -999;
  paymentAmount: number =0;
  isLoading: boolean = false;

  constructor( 
    private balanceService: BalanceService, 
    private paymentService: PaymentService) 
  {
    this.accountBalance = 0;
    this.accountName = "Basic Checking";
    this.isLoading = false;
 
  }

   getBalance(){
    this.accountBalance = this.balanceService.getBalance();
  }

  makePayment(){
    this.paymentService.makePayment(this.paymentAmount);
    this.getBalance();
  }

}