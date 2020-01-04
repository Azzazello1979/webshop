import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { ListingService } from './../../services/listing.service';


@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  product; // filled up from listingService OnInit 
  
  constructor(
    private cartService:CartService,
    private listingService:ListingService,
    private route:ActivatedRoute
    
  ) { }

  wish(){
    if(!this.product.isWished){
      this.cartService.addToWish(this.product);
    }else{
      this.cartService.removeFromWish(this.product);
    }
  }

  addToCart(formValue){
    this.cartService.plus(this.product.id, parseInt(formValue.size));
  }


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.product = this.listingService.filteredProducts[params.get('productID')];

        //convert 0 to false, 1 to true, MySQL cannot store boolean true/false...
        if(this.product.isWished === 0){
          this.product.isWished = false;
        } else if(this.product.isWished === 1){
          this.product.isWished === true
        }
        //this.product = this.listingService.products[+params.get('productID')]; ( + is used to convert a string into a number );
      },
      err => {
        console.log(err);
      }
    );

    
  }



}
