import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  

  constructor(
    private cartService:CartService,
    private auth:AuthService,
    private router:Router
  ) { }



  proceedToPay(){
    console.log('later...')
  }

  ngOnInit() {
    
  }

}
