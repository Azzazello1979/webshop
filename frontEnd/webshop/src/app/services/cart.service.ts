import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';





@Injectable({
  providedIn: 'root'
})
export class CartService {


  currentUserId = 0; // user id from token

  // load products from DB on startup 
  products = [
    {
      id: 1, collection: 'Rittis', productName: 'Rittis-1', isWished: false,
      price: 92.95, totalPrice: 0, stone: 'sona diamond', carat: 15, cut: 'cushion',
      img: './../../assets/images/collections/rittis/Rittis-1.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 2, collection: 'Rittis', productName: 'Rittis-2', isWished: false,
      price: 73.95, totalPrice: 0, stone: 'sona diamond', carat: 15, cut: 'princess',
      img: './../../assets/images/collections/rittis/Rittis-2.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 3, collection: 'Rittis', productName: 'Rittis-3', isWished: false,
      price: 51.95, totalPrice: 0, stone: 'moissanite', carat: 15, cut: 'princess',
      img: './../../assets/images/collections/rittis/Rittis-3.jpg',
      material: 'platinum 14k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 4, collection: 'Biafin', productName: 'Biafin-1', isWished: false,
      price: 23.95, totalPrice: 0, stone: 'zircone', carat: 0, cut: 'flower',
      img: './../../assets/images/collections/biafin/Biafin-1.jpg',
      material: 'dipped rose gold', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 5, collection: 'Biafin', productName: 'Biafin-2', isWished: false,
      price: 16.95, totalPrice: 0, stone: 'zircone', carat: 0, cut: 'flower',
      img: './../../assets/images/collections/biafin/Biafin-2.jpg',
      material: 'dipped black gold', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 6, collection: 'Biafin', productName: 'Biafin-3', isWished: false,
      price: 244.95, totalPrice: 0, stone: 'real ruby', carat: 4, cut: 'flower',
      img: './../../assets/images/collections/biafin/Biafin-3.jpg',
      material: 'rose gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 7, collection: 'Sultavia', productName: 'Sultavia-1', isWished: false,
      price: 87.95, totalPrice: 0, stone: 'cr sapphire', carat: 7, cut: 'oval',
      img: './../../assets/images/collections/sultavia/Sultavia-1.jpg',
      material: 'silver 15k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 8, collection: 'Sultavia', productName: 'Sultavia-2', isWished: false,
      price: 22.95, totalPrice: 0, stone: 'rainbow zircone', carat: 5, cut: 'pearl',
      img: './../../assets/images/collections/sultavia/Sultavia-2.jpg',
      material: 'platinum 15k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 9, collection: 'Sultavia', productName: 'Sultavia-3', isWished: false,
      price: 381.95, totalPrice: 0, stone: 'real ruby', carat: 9, cut: 'oval',
      img: './../../assets/images/collections/sultavia/Sultavia-3.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 10, collection: 'Prestias', productName: 'Prestias-1', isWished: false,
      price: 95.95, totalPrice: 0, stone: 'sona diamond', carat: 8, cut: 'heart',
      img: './../../assets/images/collections/prestias/Prestias-1.jpg',
      material: 'yellow gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 11, collection: 'Prestias', productName: 'Prestias-2', isWished: false,
      price: 143.95, totalPrice: 0, stone: 'real diamond', carat: 1, cut: 'heart',
      img: './../../assets/images/collections/prestias/Prestias-2.jpg',
      material: 'rose gold 18k', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },
    {
      id: 12, collection: 'Prestias', productName: 'Prestias-3', isWished: false,
      price: 18.95, totalPrice: 0, stone: 'cr ruby', carat: 2, cut: 'heart',
      img: './../../assets/images/collections/prestias/Prestias-3.jpg',
      material: 'dipped rose gold', description: 'blah blah blah',
      amount: 0, sale: 0.85, show: 0.8, sizes: 0, gallImages: 0
    },



  ]; // ALL products pulled from db
  
  totalItems = 0; // total number of items in cart
  totalPrice = 0; // total price of rings, no shipping added yet
  clickedCollection = ''; // name of currently clicked collection
  oneCollection = []; // the clickedCollection's objects
  shippingAddress = {
    country: 'USA',
    state: 'Texas',
    county: 'Archer',
    city: 'Archer city',
    ZIP: 1234,
    POBOX: 1234,
    address1: 'some',
    address2: 'some',
    extra: 'extra info'
  };
  billingAddress = {
    country: '',
    state: '',
    county: '',
    city: '',
    ZIP: 0,
    POBOX: 0,
    address1: '',
    address2: ''
  };
  shippingOptions: any = [
    { id:1, name: 'free', cost: 0, minDays: 30, maxDays: 50, imgSrc: './../../assets/icons/shipping-icon.png' },
    { id:2, name: 'ePacket', cost: 10, minDays: 7, maxDays: 14, imgSrc: './../../assets/icons/Shipping-3-icon.png' },
    { id:3, name: 'FedEx', cost: 22, minDays: 5, maxDays: 12, imgSrc: './../../assets/icons/Shipping-4-icon.png' },
    { id:4, name: 'UPS', cost: 15, minDays: 6, maxDays: 11, imgSrc: './../../assets/icons/Shipping-5-icon.png' },
    { id:5, name: 'TnT', cost: 33, minDays: 5, maxDays: 7, imgSrc: './../../assets/icons/Shipping-7-icon.png' },
    { id:6, name: 'DHL', cost: 29, minDays: 3, maxDays: 9, imgSrc: './../../assets/icons/Shipping-8-icon.png' }
  ]; // get this arr from db
  selectedShippingOption = { id:1, name: 'free', cost: 0, minDays: 30, maxDays: 50 };
  billingAddressIsDifferentFromShippingAddress = false;
  addressSubmitted = false;

  cartProducts = []; 
  wishListProducts = [];
 
  



  constructor(
    private http:HttpClient,
    private auth:AuthService
  ) {}



  addToWish(product) {
    this.wishListProducts.push(product);
    this.products.forEach( e => e.id === product.id ? e.isWished = !e.isWished : null ); 
    console.log('wishList items: ', this.wishListProducts);
  }

  removeFromWish(product){
    this.wishListProducts = this.wishListProducts.filter(e => e.id !== product.id);
    this.products.forEach( e => e.id === product.id ? e.isWished = !e.isWished : null );
    console.log('wishList items: ', this.wishListProducts);
  }




  shippingAddressSubmit(formValue) {
    this.shippingAddress = formValue;
    this.addressSubmitted = true;
    console.log('shippingAddress from cartService: ', this.shippingAddress);
    window.alert('Your shipping address is recorded');
  }

  billingAddressSubmit(formValue) {
    this.billingAddress = formValue;
    console.log('billingAddress from cartService: ', this.billingAddress);
    window.alert('Your billing address is recorded');
  }

  toggleShippingBillingAddress() {
    this.billingAddressIsDifferentFromShippingAddress = !this.billingAddressIsDifferentFromShippingAddress;
  }




  getProducts() {
    //call products end-point (get available rings for sale)
    return this.products;
  }

  getCartProducts() {
    // get products added to the cart
    this.cartProducts = this.products.filter(e => e.amount > 0);
    //console.log(this.cartProducts.length);
  }



  plus(productID) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === productID) {
        this.products[i].amount++;
        this.products[i].totalPrice += this.products[i].price;
        this.totalItems++;
        this.totalPrice += this.products[i].price;
        this.getCartProducts(); // update cartProducts
      }
    }
  }

  minus(productID) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === productID) {
        if (this.products[i].amount === 0) {
          return;
        }
        this.products[i].amount--;
        this.products[i].totalPrice -= this.products[i].price;
        this.totalItems--;
        this.totalPrice -= this.products[i].price;
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





  // call these on LOGOUT:
  // because this method is called on logout, there is no need to unsubscribe
  

 // save current user cart items,amount & shipping preference to DB
  saveCart(){
    let info = {
      'cartProducts':this.cartProducts,
      'shippingOption':this.selectedShippingOption
    };
    return this.http.post<any>(`${environment.backURL}/cart`, info )
    .subscribe(
      res => {
        console.log("cart service: OK, cart items saved to db. ", res)
        this.saveWish()
      },
      err =>
        console.log(
          "cart service: Error when saving cart items to db. ",
          err
        )
    );
  }

  // now save current wish list to db and finally call this.auth.logout() that clears the token an sets flags in auth.service
  saveWish(){
    return this.http.post<any>(`${environment.backURL}/wish`, this.wishListProducts)
    .subscribe(
      res => {
        console.log("cart service: OK, wish items saved to db. ", res)
        this.auth.logout(); // call this last, it clears token, and token is needed by above save methods
      },
      err =>
        console.log(
          "cart service: Error when saving wish items to db. ",
          err
        )
    );
  }






   // call these on LOGIN:
   
   loadUserCartAndShipping() {
    // get the saved cart contents
     // we need:
     // array of {product_id, amount}
     // {shipping_id}
     // set amount in products
     // set selectedShippingOption from shippingOptions

    return this.http.get<any>(`${environment.backURL}/cart`)
    .subscribe(
      result => {
        console.log('current saved cart of user: ')
        console.log(result[0]) 

        // update selectedShippingOption from databse
        let shippingID = 1;
        shippingID = result[0][0].shipping_id; // the saved shipping id, belonging to the saved cart, from database
        this.selectedShippingOption = this.shippingOptions.filter(e => e.id === shippingID)[0];
        //console.log(this.selectedShippingOption.name);

        // update products amounts from database ... update cart based on saved user data
        result[0].forEach(savedCartItem => {
          this.products.forEach(p => {

            if(p.id === savedCartItem.product_id){
              p.amount = savedCartItem.amount;
              p.totalPrice = p.price * p.amount;
              this.totalItems ++;
              this.totalPrice += p.totalPrice;
              this.getCartProducts(); // update cartProducts
            }
          })
        })
        
        

      },
      err => console.log('ERROR @cartService @loadUserCart() ' + err)
    );
    
  }

  // update wishListProducts from database
  loadUserWish(){
   
   return this.http.get<any>(`${environment.backURL}/wish`)
   .subscribe(
     result => {
      console.log('current saved wish list of user: ')
      console.log(result[0])
      
      

    result[0].forEach(wishedItem => {
      this.products.forEach(p => {
        if(p.id === wishedItem.product_id){
          p.isWished = true; 
          this.wishListProducts.push(p); 
        }
      })
    })

      

     },
     err => console.log('ERROR @cartService @loadUserWish() ' + err)
   );
  }








}
