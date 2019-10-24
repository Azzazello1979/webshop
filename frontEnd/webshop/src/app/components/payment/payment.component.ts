import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../../services/payment.service';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  

  constructor(
    private paymentService:PaymentService,
    private cartService:CartService
  ) { }

  selectPayment(paymentObj){
    this.paymentService.selectPayment(paymentObj);
  }




  ngOnInit() {
    
  }

}
