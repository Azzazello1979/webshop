import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  theOrder = [];

  constructor(
    private cartService:CartService,
    private auth:AuthService
  ) { }

  fillTheOrder(){
    this.theOrder = this.cartService.getCartProducts();
    console.table(this.theOrder);
  }

  proceedToPay(){

  }

  ngOnInit() {
    this.fillTheOrder();
  }

}
