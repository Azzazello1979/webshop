import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from './../../services/payment.service';
import { CartService } from './../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  saveOrderSubscription:Subscription = new Subscription();

  constructor(
    private paymentService:PaymentService,
    private cartService:CartService
  ) { }


  initPayment(paymentOption){
    this.saveOrderSubscription = this.paymentService.initPayment(paymentOption).
      subscribe(
        (success) => {
          console.log('Payment init successful', success)
        },
        (error) => {
          console.log('Payment init failed! ', error)
        }
    );
  }



  ngOnInit() {}

  ngOnDestroy(){
    this.saveOrderSubscription.unsubscribe();
  }

}
