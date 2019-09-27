import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  products = [
    {
      id: 1, collection: 'Rittis', productName: 'Rittis-1',
      price: 92.95, totalPrice: 92.95, stone: 'sona', carat: 15, cut: 'NA',
      img: './../../assets/images/collections/rittis/Rittis-1.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 2, collection: 'Rittis', productName: 'Rittis-2',
      price: 73.95, totalPrice: 73.95, stone: 'sona', carat: 15, cut: 'NA',
      img: './../../assets/images/collections/rittis/Rittis-2.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 3, collection: 'Rittis', productName: 'Rittis-3',
      price: 51.95, totalPrice: 51.95, stone: 'moissanite', carat: 15, cut: 'NA',
      img: './../../assets/images/collections/rittis/Rittis-3.jpg',
      material: 'platinum 14k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 4, collection: 'Biafin', productName: 'Biafin-1',
      price: 23.95, totalPrice: 23.95, stone: 'zircone', carat: 0, cut: 'NA',
      img: './../../assets/images/collections/biafin/Biafin-1.jpg',
      material: 'dipped rose gold', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 5, collection: 'Biafin', productName: 'Biafin-2',
      price: 16.95, totalPrice: 16.95, stone: 'zircone', carat: 0, cut: 'NA',
      img: './../../assets/images/collections/biafin/Biafin-2.jpg',
      material: 'dipped black gold', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 6, collection: 'Biafin', productName: 'Biafin-3',
      price: 244.95, totalPrice: 244.95, stone: 'real ruby', carat: 4, cut: 'NA',
      img: './../../assets/images/collections/biafin/Biafin-3.jpg',
      material: 'rose gold 18k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 7, collection: 'Sultavia', productName: 'Sultavia-1',
      price: 87.95, totalPrice: 87.95, stone: 'cr sapphire', carat: 7, cut: 'NA',
      img: './../../assets/images/collections/sultavia/Sultavia-1.jpg',
      material: 'silver 15k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 8, collection: 'Sultavia', productName: 'Sultavia-2',
      price: 22.95, totalPrice: 22.95, stone: 'rainbow zircone', carat: 5, cut: 'NA',
      img: './../../assets/images/collections/sultavia/Sultavia-2.jpg',
      material: 'platinum 15k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 9, collection: 'Sultavia', productName: 'Sultavia-3',
      price: 381.95, totalPrice: 381.95, stone: 'real ruby', carat: 9, cut: 'NA',
      img: './../../assets/images/collections/sultavia/Sultavia-3.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 10, collection: 'Prestias', productName: 'Prestias-1',
      price: 95.95, totalPrice: 95.95, stone: 'sona diamond', carat: 8, cut: 'NA',
      img: './../../assets/images/collections/prestias/Prestias-1.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 11, collection: 'Prestias', productName: 'Prestias-2',
      price: 143.95, totalPrice: 143.95, stone: 'real diamond', carat: 1, cut: 'NA',
      img: './../../assets/images/collections/prestias/Prestias-2.jpg',
      material: 'rose gold 18k', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 12, collection: 'Prestias', productName: 'Prestias-3',
      price: 18.95, totalPrice: 18.95, stone: 'cr ruby', carat: 2, cut: 'heart',
      img: './../../assets/images/collections/prestias/Prestias-3.jpg',
      material: 'dipped rose gold', description: 'blah blah blah',
      amount: 1, totalAmount: 1, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },



  ];
  totalItems = 0; // total number of items in cart
  totalPrice = 0; // total price of rings, no shipping added yet


  constructor() { }

  getProducts() {
    //call products end-point
    return this.products;
  }

  addItem(product){ // product identified by productName, unique
    for(let i=0 ; i<this.products.length ; i++){
      if(this.products.length > 0 && this.products[i].productName === product.productName){
        this.products[i].amount ++ ;
        this.products[i].totalPrice = this.products[i].totalPrice + this.products[i].price ;
        this.totalItems ++ ;
        this.totalPrice = this.totalPrice + this.products[i].price ;
        window.alert('This item was already in the cart, we increased it\'s amount!') ;
        return ; 
      }
    }
        window.alert('Product has been added to your cart!');
        this.products.push(product);
        this.totalItems ++ ;
        this.totalPrice = this.totalPrice + product.price ;
  }

  plus(productName){
    for(let i=0 ; i<this.products.length ; i++){
      if(this.products[i].productName === productName){
        this.products[i].amount ++ ;
        this.products[i].totalPrice = this.products[i].totalPrice + this.products[i].price ; 
        this.totalItems ++ ;
        this.totalPrice = this.totalPrice + this.products[i].price ; 
      }
    }
  }

  minus(productName){
    for(let i=0 ; i<this.products.length ; i++){
      if(this.products[i].productName === productName){
        if(this.products[i].amount === 0){
          return ;
        }
        this.products[i].amount -- ;
        this.products[i].totalPrice = this.products[i].totalPrice - this.products[i].price ;
        this.totalItems -- ;
        this.totalPrice = this.totalPrice - this.products[i].price ; 
      }
    }
  }

  clearCart(){
    this.products.forEach(e => {
      e.amount = 0 ;
    });
    this.totalItems = 0 ;
    this.totalPrice = 0 ;
  }





}
