import { Component, OnInit } from '@angular/core';
import { WishlistService } from './../../services/wishlist.service';

@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  

  constructor(
    private wishListService:WishlistService
  ) { }

  showWishList(){
    this.wishListService.show();
  }

  ngOnInit() {
  }

}
