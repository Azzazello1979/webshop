import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  constructor(
    private cartService: CartService,
    private router:Router
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







}
