import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}


  add(productName){
    this.cartService.plus(productName);
  }

  deduct(productName){
    this.cartService.minus(productName);
  }

  proceedToCheckout(){
    this.router.navigate(['/checkout']);
  }

  clearCart(){
    this.cartService.clearCart();
  }

  captureBillingAddress(){
    console.log('later...')
  }

  captureShippingAddress(){
    console.log('later...')
  }

  captureShippingOption(){
    console.log('later...')
  }


  ngOnInit(){

  }


}
