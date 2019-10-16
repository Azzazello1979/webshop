import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentOptions:any = [
    { name: 'PayPal', img: './../../assets/icons/paypal-icon.png', url: 'https://paypal.com' },
    { name: 'MasterCard', img: './../../assets/icons/mastercard-icon.png', url: 'https://paypal.com' },
    { name: 'Visa', img: './../../assets/icons/visa-icon.png', url: 'https://paypal.com' }
  ]; //bring in from database

  constructor() { }
}
