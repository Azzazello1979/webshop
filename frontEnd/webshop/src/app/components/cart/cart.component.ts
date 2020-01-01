import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';



@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  

  constructor(
    private auth:AuthService,
    private cartService: CartService,
    private router: Router
  ) {}


  add(productID){
    this.cartService.plus(productID);
  }

  deduct(productID){
    this.cartService.minus(productID);
  }

  collectAddress(){
    this.router.navigate(['/address']);
  }

  clearCart(){
    this.cartService.clearCart();
  }

  
  ngOnInit(){
    this.cartService.getCartProducts();
  }


}
