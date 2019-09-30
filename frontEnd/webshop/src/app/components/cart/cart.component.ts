import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  checkoutForm;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      useraddress: ''
    });
  }

  add(productName){
    this.cartService.plus(productName);
  }

  deduct(productName){
    this.cartService.minus(productName);
  }

  onSubmit(customerData){
    //later send customerData to backend here
    window.alert(`Thank You ${customerData.username}, your order has been submitted!`);
    this.cartService.clearCart();
    this.checkoutForm.reset();
  }







}
