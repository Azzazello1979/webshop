import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { ListingService } from './../../services/listing.service';
import { WishlistService } from './../../services/wishlist.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy{

  product;
  isWished:boolean = false;

  constructor(
    private cartService:CartService,
    private listingService:ListingService,
    private route:ActivatedRoute,
    private wishListService:WishlistService
  ) { }

  wish(product){
    if(product.isWished === false){
      this.cartService.addToWish(product);
    }else{
      this.cartService.removeFromWish(product);
    }
  }

  addToCart(){
    this.cartService.addItem(this.product);
  }


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.product = this.listingService.filteredProducts[params.get('productID')]; //this.product = this.cartService.oneCollection[params.get('productID')];
        //this.product = this.cartService.products[+params.get('productID')]; ( + is used to convert a string into a number )
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(){
    // save the state of isWished in wishlistService
  }

}
