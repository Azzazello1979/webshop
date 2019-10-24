import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
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

  initPayment(paymentOption) {
    this.selectedPayment = paymentOption;
    this.fillOrder();
    return this.saveOrder();
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
    };

    // If billing address was given by user, append billing address object to order too
    Object.keys(this.cartService.billingAddress).length > 0 ? 
      this.order['billingAddress'] = this.cartService.billingAddress : 
      null;
    
  }

  saveOrder() {
    //save order to database, assoc. with current email, subscribe to reply
    return this.http.post<any>(`${environment.backURL}/orders`, this.order);
  }


}
