import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  selectedPriceRange:string = '';
  selectedCollection:string = '';
  selectedStone:string = '';

  allProducts:any = [];
  filteredProducts:any = []; // fills up after running setFilteredProducts()

  priceRanges:any = [];

  allCollections:any = []; // the array of existing collection names
  allStones:any = []; // the array of existing stone types


  constructor(
    private cartService:CartService
  ) { }

    // initialized by mid component (that is the product listing component)
    fillAllProducts(){ 
      this.allProducts = this.cartService.getProducts();
    }

    setFilteredProducts(){
      if(this.selectedCollection !== '' && this.selectedStone !== ''){
        this.filteredProducts = this.allProducts.filter( e => { e.collection === this.selectedCollection && e.stone === this.selectedStone } );
      } else {
        this.filteredProducts = this.allProducts;
      }
    }

    getAllCollections(){
      let result = [];
      for(let i=0 ; i<this.allProducts.length ; i++){
        if(!result.includes(this.allProducts[i].collection))
        result.push(this.allProducts[i].collection)
      }
      result.unshift('All collections');
      this.allCollections = result;
    }


    getAllStones(){
      let result = [];
      for(let i=0 ; i<this.allProducts.length ; i++){
        if(!result.includes(this.allProducts[i].stone))
        result.push(this.allProducts[i].stone)
      }
      result.unshift('All stones');
      this.allStones = result;
    }


}
