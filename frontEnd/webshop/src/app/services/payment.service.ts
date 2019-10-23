import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  selectedPayment = "";
  order = {};

  paymentOptions:any = [
    { name: 'PayPal', img: './../../assets/icons/paypal-icon.png', url: 'https://paypal.com' },
    { name: 'MasterCard', img: './../../assets/icons/mastercard-icon.png', url: 'https://paypal.com' },
    { name: 'Visa', img: './../../assets/icons/visa-icon.png', url: 'https://paypal.com' }
  ]; //bring in from database

  constructor(
    private cartService:CartService
  ) { }

  selectPayment(paymentName){
    this.selectedPayment = paymentName;
    this.fillOrder();
    this.saveOrder();
  }

  fillOrder(){
    this.order = {
      //email: get email from token, use jsonwebtoken helper in front end to extract email from token,
      paymentOption: this.selectedPayment,

    }
  }

  saveOrder(){
    //save order to database, assoc. with current email, subscribe to reply
  }


}
