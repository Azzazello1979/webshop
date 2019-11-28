import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  selectedPriceRange:string = 'no filter'; // ... yet to be done ...
  selectedCollection:string = 'no filter'; // set from collection-filter.component
  selectedStone:string = 'no filter'; // set from stone-filter.component

  allProducts:any = [];
  filteredProducts:any = []; // fills up after running setFilteredProducts()

  allPriceRanges:any = []; // ... yet to be done ...
  allCollections:any = []; // the array of existing collection names
  allStones:any = []; // the array of existing stone types
  allCuts:any = []; // the array of existing cut types
  allMaterials:any = []; // the array of existing materials

  minPriceSet:number = 10;
  maxPriceSet:number = 500;

  someFilterApplied = false;

  constructor(
    private cartService:CartService
  ) { }





    // initialized by mid component (that is the product listing component)
    fillAllProducts(){ 
      this.allProducts = this.cartService.getProducts();
      
    }

    
    setFilteredProducts(){
      if(this.selectedCollection === 'no filter' && this.selectedStone === 'no filter' ){
        this.filteredProducts = this.allProducts.filter(e => e.price >= this.minPriceSet && e.price <= this.maxPriceSet );
      } else if(this.selectedCollection === 'no filter' && this.selectedStone !== 'no filter'){
        this.filteredProducts = this.allProducts.filter( e => e.stone === this.selectedStone && e.price >= this.minPriceSet && e.price <= this.maxPriceSet );
      } else if(this.selectedCollection !== 'no filter' && this.selectedStone === 'no filter'){
        this.filteredProducts = this.allProducts.filter( e => e.collection === this.selectedCollection && e.price >= this.minPriceSet && e.price <= this.maxPriceSet );
      } else if(this.selectedCollection !== 'no filter' && this.selectedStone !== 'no filter'){
        this.filteredProducts = this.allProducts.filter( e => e.collection === this.selectedCollection && e.stone === this.selectedStone && e.price >= this.minPriceSet && e.price <= this.maxPriceSet );
    }
  }

  
    removeAllFilters(){
      this.filteredProducts = this.allProducts;
      this.selectedPriceRange = 'no filter';
      this.selectedCollection = 'no filter';
      this.selectedStone = 'no filter';

      this.minPriceSet = 10;
      this.maxPriceSet = 500;
      this.someFilterApplied = false;
    }



    getAllCollections(){
      let result = [];
      for(let i=0 ; i<this.allProducts.length ; i++){
        if(!result.includes(this.allProducts[i].collection))
        result.push(this.allProducts[i].collection)
      }
      result.unshift('no filter');
      this.allCollections = result;
      return result;
    }


    getAllStones(){
      let result = [];
      for(let i=0 ; i<this.allProducts.length ; i++){
        if(!result.includes(this.allProducts[i].stone))
        result.push(this.allProducts[i].stone)
      }
      result.unshift('no filter');
      this.allStones = result;
      return result;
    }

    getAllCuts(){
      let result = [];
      for(let i=0 ; i<this.allProducts.length ; i++){
        if(!result.includes(this.allProducts[i].cut))
        result.push(this.allProducts[i].cut)
      }
      result.unshift('no filter');
      this.allCuts = result;
      return result;
    }

    getAllMaterials(){
      let result = [];
      for(let i=0 ; i<this.allProducts.length ; i++){
        if(!result.includes(this.allProducts[i].material))
        result.push(this.allProducts[i].material)
      }
      result.unshift('no filter');
      this.allMaterials = result;
      return result;
    }

    // get from DB
    getAllSizes(){
      return [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14]
    }





}
