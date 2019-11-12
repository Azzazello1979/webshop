import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.cartService.loadUserCart();
  }

}
