import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishList = [];
  wishListProductNames = []; // product is identified by its name

  constructor() { }


  wish(product) {
    
    this.fillWishListProductNames();
    if (!this.wishListProductNames.includes(product.productName)) { // add product to wishList if its not there yet
      this.wishList.push(product);
    } else { // if product is there already remove it
      this.wishList = this.wishList.filter(e => {e.productName !== product.productName});
    }

  }

  fillWishListProductNames() {
    if (this.wishList.length > 0) {
      this.wishList.forEach(e => {
        this.wishListProductNames.push(e.productName);
      })
    } else {
      return console.log('the wishList is empty');
    }

  }

  show() {
    console.log(this.wishList);
  }



}
