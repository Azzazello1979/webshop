import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  selectedPayment = { id: 1, name: 'PayPal', img: './../../assets/icons/paypal-icon.png', url: 'https://paypal.com' }; // default selected payment obj
  order = {};

  paymentOptions: any = [
    { id: 1, name: 'PayPal', img: './../../assets/icons/paypal-icon.png', url: 'https://paypal.com' },
    { id: 2, name: 'MasterCard', img: './../../assets/icons/mastercard-icon.png', url: 'https://paypal.com' },
    { id: 3, name: 'Visa', img: './../../assets/icons/visa-icon.png', url: 'https://paypal.com' }
  ]; //bring in from database

  constructor(
    private cartService:CartService,
    private auth:AuthService,
    private http:HttpClient
  ) { }

  selectPayment(paymentObj) {
    this.selectedPayment = paymentObj;
    this.fillOrder();
    this.saveOrder();
  }

  fillOrder() {
    this.order = {
      token: this.auth.getToken(),
      shippingOption: this.cartService.selectedShippingOption.id,
      paymentOption: this.selectedPayment.id,
      // shipping address
      shippingAddress: this.cartService.shippingAddress, // this is an object
      // to suborder table
      products: this.cartService.cartProducts // this is an array of objects 
    }

    if (Object.keys(this.cartService.billingAddress).length === 0) { // if billing address is not set
      return;
    } else { // billing address is set, lets append billingAddress object to order
      this.order['billingAddress'] = this.cartService.billingAddress; // this is an object
    }

  }

  saveOrder() {
    //save order to database, assoc. with current email, subscribe to reply

  }


}
