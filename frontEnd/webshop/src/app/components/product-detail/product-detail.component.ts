import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product;

  constructor(
    private cartService:CartService,
    private route:ActivatedRoute
  ) { }


  addToCart(){
    this.cartService.addItem(this.product);
  }


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.product = this.cartService.products[params.get('productID')];
        //this.product = this.cartService.products[+params.get('productID')];
      },
      err => {
        console.log(err);
      }
    );
  }

}
