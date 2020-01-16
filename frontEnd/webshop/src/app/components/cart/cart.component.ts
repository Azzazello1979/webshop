import { Router } from '@angular/router'
import { CartService } from './../../services/cart.service'
import { Component, OnInit } from '@angular/core'


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


  increment(productUID){
    this.cartService.increment(productUID)
  }

  decrement(productUID){
    this.cartService.decrement(productUID)
  }

  collectAddress(){
    this.router.navigate(['/address'])
  }

  clearCart(){
    this.cartService.clearCart()
  }

  
  ngOnInit(){
    this.cartService.initShippingOptions()
  }


}
