import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  

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

  collectAddress(){
    this.router.navigate(['/address']);
  }

  clearCart(){
    this.cartService.clearCart();
  }

  
  ngOnInit(){
    this.cartService.getCartProducts();
    this.cartService.selectedShippingOption = this.cartService.shippingOptions[0]; // always start component with default shipping (free)
  }


}
