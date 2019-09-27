import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css']
})
export class MidComponent implements OnInit {

  products = [];

  constructor(
    private cartService:CartService
  ) { }

  showProducts(){
    this.products = this.cartService.getProducts();
  }







  ngOnInit() {
    this.showProducts();
  }
  
}
