import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../../services/payment.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  
  constructor(
    private paymentService:PaymentService
  ) { }


  initPayment(paymentOption){
    this.paymentService.initPayment(paymentOption)
  }


  ngOnInit() {
    this.paymentService.getPaymentOptions()
  }

  

}
