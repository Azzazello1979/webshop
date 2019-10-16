import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  products = [
    {
      id: 1, collection: 'Rittis', productName: 'Rittis-1',
      price: 92.95, totalPrice: 0, stone: 'sona diamond', carat: 15, cut: 'cushion',
      img: './../../assets/images/collections/rittis/Rittis-1.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 2, collection: 'Rittis', productName: 'Rittis-2',
      price: 73.95, totalPrice: 0, stone: 'sona diamond', carat: 15, cut: 'princess',
      img: './../../assets/images/collections/rittis/Rittis-2.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 3, collection: 'Rittis', productName: 'Rittis-3',
      price: 51.95, totalPrice: 0, stone: 'moissanite', carat: 15, cut: 'princess',
      img: './../../assets/images/collections/rittis/Rittis-3.jpg',
      material: 'platinum 14k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 4, collection: 'Biafin', productName: 'Biafin-1',
      price: 23.95, totalPrice: 0, stone: 'zircone', carat: 0, cut: 'flower',
      img: './../../assets/images/collections/biafin/Biafin-1.jpg',
      material: 'dipped rose gold', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 5, collection: 'Biafin', productName: 'Biafin-2',
      price: 16.95, totalPrice: 0, stone: 'zircone', carat: 0, cut: 'flower',
      img: './../../assets/images/collections/biafin/Biafin-2.jpg',
      material: 'dipped black gold', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 6, collection: 'Biafin', productName: 'Biafin-3',
      price: 244.95, totalPrice: 0, stone: 'real ruby', carat: 4, cut: 'flower',
      img: './../../assets/images/collections/biafin/Biafin-3.jpg',
      material: 'rose gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 7, collection: 'Sultavia', productName: 'Sultavia-1',
      price: 87.95, totalPrice: 0, stone: 'cr sapphire', carat: 7, cut: 'oval',
      img: './../../assets/images/collections/sultavia/Sultavia-1.jpg',
      material: 'silver 15k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 8, collection: 'Sultavia', productName: 'Sultavia-2',
      price: 22.95, totalPrice: 0, stone: 'rainbow zircone', carat: 5, cut: 'pearl',
      img: './../../assets/images/collections/sultavia/Sultavia-2.jpg',
      material: 'platinum 15k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 9, collection: 'Sultavia', productName: 'Sultavia-3',
      price: 381.95, totalPrice: 0, stone: 'real ruby', carat: 9, cut: 'oval',
      img: './../../assets/images/collections/sultavia/Sultavia-3.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 10, collection: 'Prestias', productName: 'Prestias-1',
      price: 95.95, totalPrice: 0, stone: 'sona diamond', carat: 8, cut: 'heart',
      img: './../../assets/images/collections/prestias/Prestias-1.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 11, collection: 'Prestias', productName: 'Prestias-2',
      price: 143.95, totalPrice: 0, stone: 'real diamond', carat: 1, cut: 'heart',
      img: './../../assets/images/collections/prestias/Prestias-2.jpg',
      material: 'rose gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },
    {
      id: 12, collection: 'Prestias', productName: 'Prestias-3',
      price: 18.95, totalPrice: 0, stone: 'cr ruby', carat: 2, cut: 'heart',
      img: './../../assets/images/collections/prestias/Prestias-3.jpg',
      material: 'dipped rose gold', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, size: [9, 10, 11, 12, 13, 14, 15]
    },



  ]; // ALL products pulled from db
  cartProducts = []; // products in the cart 
  totalItems = 0; // total number of items in cart
  totalPrice = 0; // total price of rings, no shipping added yet
  allCollections = []; // array of unique collection names
  clickedCollection = ''; // name of currently clicked collection
  oneCollection = []; // the clickedCollection's objects
  shippingAddress = {};
  billingAddress = {};
  shippingOptions:any = [ 
    { name: 'free', cost: 0, minDays: 30, maxDays: 50, imgSrc: './../../assets/icons/shipping-icon.png' },
    { name: 'ePacket', cost: 10, minDays: 7, maxDays: 14, imgSrc: './../../assets/icons/Shipping-3-icon.png' },
    { name: 'FedEx', cost: 22, minDays: 5, maxDays: 12, imgSrc: './../../assets/icons/Shipping-4-icon.png' },
    { name: 'UPS', cost: 15, minDays: 6, maxDays: 11, imgSrc: './../../assets/icons/Shipping-5-icon.png' },
    { name: 'TnT', cost: 33, minDays: 5, maxDays: 7, imgSrc: './../../assets/icons/Shipping-7-icon.png' },
    { name: 'DHL', cost: 29, minDays: 3, maxDays: 9, imgSrc: './../../assets/icons/Shipping-8-icon.png' }
  ]; // get this arr from db
  selectedShippingOption = { name: 'free', cost: 0, minDays: 30, maxDays: 50 };
  billingAddressIsDifferentFromShippingAddress = false;
  addressSubmitted = false;
  



  constructor() { 
    this.oneCollection = this.products;
  }



  shippingAddressSubmit(formValue){
    this.shippingAddress = formValue;
    this.addressSubmitted = true;
    console.log('shippingAddress from cartService: ', this.shippingAddress);
    window.alert('Your shipping address is recorded');
  }

  billingAddressSubmit(formValue){
    this.billingAddress = formValue;
    console.log('billingAddress from cartService: ', this.billingAddress);
    window.alert('Your billing address is recorded');
  }

  toggleShippingBillingAddress(){
    this.billingAddressIsDifferentFromShippingAddress = !this.billingAddressIsDifferentFromShippingAddress ;
  }

  theClickedCollection(collectionName){
    if(collectionName === 'All collections'){
      return this.oneCollection = this.products;
    }
    this.clickedCollection = collectionName;
    //console.log(this.clickedCollection);
    let result = [];
    result = this.products.filter(e => e.collection === collectionName);
    this.oneCollection = result;
    console.log(this.oneCollection);
  }

  getAllCollections(){
    let result = [];
    for(let i=0 ; i<this.products.length ; i++){
      if(!result.includes(this.products[i].collection))
      result.push(this.products[i].collection)
    }
    result.unshift('All collections');
    this.allCollections = result;
    //console.log(this.allCollections);
  }

  getProducts() {
    //call products end-point (get available rings for sale)
    return this.products;
  }

  getCartProducts(){
    // get products added to the cart
    this.cartProducts = this.products.filter(e => e.amount > 0);
    //console.log(this.cartProducts.length);
  }

  addItem(product) { // product identified by productName, unique
    for (let i = 0; i < this.products.length; i++) {
      if (this.products.length > 0 && this.products[i].productName === product.productName) {
        this.products[i].amount++;
        this.products[i].totalPrice = this.products[i].totalPrice + this.products[i].price;
        this.totalItems++;
        this.totalPrice = this.totalPrice + this.products[i].price;
        this.getCartProducts(); // update cartProducts
        return;
      }
    }
  }

  plus(productName) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productName === productName) {
        this.products[i].amount++;
        this.products[i].totalPrice = this.products[i].totalPrice + this.products[i].price;
        this.totalItems++;
        this.totalPrice = this.totalPrice + this.products[i].price;
        this.getCartProducts(); // update cartProducts
      }
    }
  }

  minus(productName) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productName === productName) {
        if (this.products[i].amount === 0) {
          return;
        }
        this.products[i].amount--;
        this.products[i].totalPrice = this.products[i].totalPrice - this.products[i].price;
        this.totalItems--;
        this.totalPrice = this.totalPrice - this.products[i].price;
        this.getCartProducts(); // update cartProducts
      }
    }
  }

  clearCart() {
    this.products.forEach(e => {
      e.amount = 0;
    });
    this.totalItems = 0;
    this.totalPrice = 0;
    this.getCartProducts(); // update cartProducts
  }





}
