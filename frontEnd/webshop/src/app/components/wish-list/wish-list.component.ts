import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { ListingService } from './../../services/listing.service';

@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {


  constructor(
    private cartService:CartService,
    private listingService:ListingService
  ) { }

  removeFromWishList(product){
    this.cartService.removeFromWish(product)
    this.listingService.allProducts.forEach(e => {
      product.id === e.id ? e.isWished = false : null
    })
  }

  ngOnInit() {
  }

}
