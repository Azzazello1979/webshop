import { CartService } from './../../services/cart.service';
import { ListingService } from 'src/app/services/listing.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css']
})
export class MidComponent implements OnInit {


  

  constructor(
    private cartService:CartService,
    private listingService:ListingService
  ) { }





  ngOnInit() {
    this.listingService.fillAllProducts();
    this.listingService.filteredProducts = this.listingService.allProducts;
    this.listingService.getAllCollections();
    this.listingService.getAllStones();

    this.cartService.loadUserCartAndShipping();
    this.cartService.loadUserWish();
    
  }
  
}
