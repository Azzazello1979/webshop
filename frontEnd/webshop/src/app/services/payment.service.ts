import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  selectedPayment = { 'id':0 }; // default selected payment obj
  order = {};
  paymentOptions: any = [
    ]; //bring in from database

  constructor(
    private cartService:CartService,
    private auth:AuthService,
    private http:HttpClient
  ) { }

  getPaymentOptions(){
    return this.http.get<any>(`${environment.backURL}/paymentoptions`).subscribe(
      res => {
        this.paymentOptions = res;
        this.selectedPayment = this.paymentOptions[0];
        console.log('payment options loaded successfully');
      },
      err => console.log('Error @ payment.service getPaymentOptions(): ' + err.message)
    )
  }

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
      obj['price'] = e.price;
      productsToSave.push(obj);
    });

    // fill order object
    this.order = {
      token: this.auth.getToken(),
      shippingOption: this.cartService.selectedShippingOption.id,
      paymentOption: this.selectedPayment.id,
      shippingAddress: this.cartService.shippingAddress, 
      products: productsToSave // this is an array of objects, objects containinig only 'id', 'amount', 'price' ... FIX LATER TO CONTAIN 'size' as well
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
