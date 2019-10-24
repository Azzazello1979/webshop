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
    // take only 'id' and 'amount' from product object
    let productsToSave = [];
    this.cartService.cartProducts.forEach(e => {
      let obj = {};
      obj['id'] = e.id;
      obj['amount'] = e.amount;
      productsToSave.push(obj);
    });

    // fill order object
    this.order = {
      token: this.auth.getToken(),
      shippingOption: this.cartService.selectedShippingOption.id,
      paymentOption: this.selectedPayment.id,
      shippingAddress: this.cartService.shippingAddress, 
      products: productsToSave // this is an array of objects, objects containinig only 'id' and 'amount' ... FIX LATER TO CONTAIN 'size' as well
    };

    // If billing address was given by user, append billing address object to order too
    this.cartService.billingAddress.country !== '' ? 
      this.order['billingAddress'] = this.cartService.billingAddress : 
      null;
  }


  saveOrder() {
    return this.http.post<any>(`${environment.backURL}/orders`, this.order);
  }


}
