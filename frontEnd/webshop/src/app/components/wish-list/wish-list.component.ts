import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  

  constructor(
    private cartService:CartService
  ) { }

  removeFromWishList(product){
    this.cartService.removeFromWish(product);
  }

  ngOnInit() {
    
  }

}
