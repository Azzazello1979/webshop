import { Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { AuthService } from "./auth.service";



@Injectable({
  providedIn: "root"
})
export class CartService {
  currentUserId = 0; // user id from token

  products = []; // load products from DB on startup

  totalItems = 0; // total number of items in cart
  totalPrice = 0; // total price of rings, no shipping added yet

  clickedCollection = ""; // name of currently clicked collection
  oneCollection = []; // the clickedCollection's objects

  shippingAddress = {};
  billingAddress = { 'country':"" };

  shippingOptions = []; // get this arr from db
  selectedShippingOption = { 'id':0 }; // default selected shipping option is "free"

  billingAddressIsDifferentFromShippingAddress = false;
  addressSubmitted = false;

  cartProducts = [];
  wishListProducts = [];
  UIDarray = [];

  cartAndShippingInitialized = false; // did you load users saved shipping preference & cart products from DB already?
  

  constructor(
    private http: HttpClient, 
    private auth: AuthService
    ) {}

  // fill up products array from database
  initProducts(){
    return this.http.get<any>(`${environment.backURL}/products`);
  }

  initShippingOptions(){
    return this.http.get<any>(`${environment.backURL}/shippingoptions`).subscribe(
      res => {
        console.log('shipping options loaded: ', res);
        this.shippingOptions = res;
        this.selectedShippingOption = res[0];
      },
      err => console.log('cartService: initShippingOptions() error: ', err)
    )
  }

  addToWish(product) {
    this.wishListProducts.push(product);
    this.products.forEach(e =>
      e.id === product.id ? (e.isWished = !e.isWished) : null
    );
    console.log("wishList items: ", this.wishListProducts);
  }

  removeFromWish(product) {
    this.wishListProducts = this.wishListProducts.filter(
      e => e.id !== product.id
    );
    this.products.forEach(e =>
      e.id === product.id ? (e.isWished = !e.isWished) : null
    );
    console.log("wishList items: ", this.wishListProducts);
  }

  shippingAddressSubmit(formValue) {
    this.shippingAddress = formValue;
    this.addressSubmitted = true;
    console.log("shippingAddress from cartService: ", this.shippingAddress);
    window.alert("Your shipping address is recorded");
  }

  billingAddressSubmit(formValue) {
    this.billingAddress = formValue;
    console.log("billingAddress from cartService: ", this.billingAddress);
    window.alert("Your billing address is recorded");
  }

  toggleShippingBillingAddress() {
    this.billingAddressIsDifferentFromShippingAddress = !this
      .billingAddressIsDifferentFromShippingAddress;
  }

  getProducts(){
    return this.products;
  }

  countCartItems():number{
    let totalCartItems = 0;
    let amounts = [];
    this.cartProducts.forEach( product => {
      amounts.push(product.amount)
    });
    amounts.length > 0 ? totalCartItems = amounts.reduce((acc, curr) => acc + curr) : null;
    return totalCartItems;
  }

  getTotalPrice():number{
    let totalPriceOfAllCartItems = 0;
    this.cartProducts.forEach(cp => {
      totalPriceOfAllCartItems += cp['price']*cp['amount'] ;
    })
    return totalPriceOfAllCartItems;
  }

  getCartProducts() {
    // get products added to the cart
    return this.cartProducts;
    //console.log(this.cartProducts.length);
  }

  plus(productID:number, size:number) {
    let objToCart = {};
    this.products.forEach(product => {
      if(product.id === productID){
        objToCart = {...product}
      } 
    });

    objToCart['size'] = size;
    objToCart['UID'] = `${objToCart['id']}_${objToCart['size']}`; // UID is new property, made up of id_size, this uniquely identifies object
    console.log("objToCart['UID'] is: " + objToCart['UID']);
    
    if(!this.UIDarray.includes(objToCart['UID'])){
      this.UIDarray.push(objToCart['UID']);
      objToCart['amount'] = 1;
      this.cartProducts.push(objToCart);
      console.log('New UID, added to cart. cartProducts: ', this.cartProducts);
    } else {
      this.cartProducts.forEach(cp => {
        cp['UID'] === objToCart['UID'] ? cp['amount'] ++ : null ;
      })
      console.log('Same UID, incremented. cartProducts: ', this.cartProducts);
    }
}

  increment(productUID:string){
    this.cartProducts.forEach(cartProduct => {
      if(cartProduct['UID'] === productUID){
        cartProduct['amount'] ++ ;
        console.log('incremented amount. cartProducts: ', this.cartProducts);
      } 
    })
  }

  decrement(productUID:string){
    this.cartProducts.forEach(cartProduct => {

      if(cartProduct['UID'] === productUID){
        if(cartProduct['amount'] === 1){
          this.cartProducts = this.cartProducts.filter(cp => cp['UID'] !== productUID);
          this.UIDarray = this.UIDarray.filter(uid => uid !== productUID) ;
          console.log('amount was 1 so took it out of list. cartProducts: ', this.cartProducts);
        } else {
          cartProduct['amount'] -- ;
          console.log('decremented amount. cartProducts: ', this.cartProducts);
        }
      }

    })
  }

  




  clearCart() {
    this.products.forEach(e => {
      e.amount = 0;
    });
    this.totalItems = 0;
    this.totalPrice = 0;
    this.getCartProducts(); // update cartProducts
  }

  // start LOGOUT procedure:
  // * saveCart()
  // * save WishList()
  // * clean up cart service variables
  // because this method is called on logout, there is no need to unsubscribe

  // save current user cart items,amount & shipping preference to DB
  saveCart() {
      let info = {
        'cartProducts': this.cartProducts,
        'shippingOption': this.selectedShippingOption
      };
      return this.http.post<any>(`${environment.backURL}/cart`, info).subscribe(
        res => {
          console.log("cart service: OK, cart items saved to db. ", res);
          this.saveWish();
        },
        err =>
          console.log("cart service: Error when saving cart items to db. ", err)
      );
  }

  // now save current wish list to db and finally call this.auth.logout() that clears the token an sets flags in auth.service
  saveWish() {
      return this.http.post<any>(`${environment.backURL}/wish`, this.wishListProducts)
      .subscribe(
        res => {
          console.log("cart service: OK, wish items saved to db. ", res);
          this.cleanUpCart();
          this.auth.logout(); // call this last, it clears token, and token is needed by above save methods
        },
        err =>
        console.log("cart service: Error when saving wish items to db. ", err)
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

    return this.http.get<any>(`${environment.backURL}/cart`).subscribe(
      result => {
        console.log("current saved cart of user: ");
        console.log(result[0]);

        
          // update selectedShippingOption from databse

          // the saved shipping id, belonging to the saved cart, from database
          let shippingID;

          if(result[0].length === 0){
            shippingID = 1;
          } else {
            shippingID = result[0][0].shipping_id; 
          }

          
          this.selectedShippingOption = this.shippingOptions.filter(
            e => e.id === shippingID
          )[0];
          //console.log(this.selectedShippingOption.name);


          // update products amounts from database ... update cart based on saved user data
          if(result[0].length > 0){
            result[0].forEach(savedCartItem => {
              this.products.forEach(p => {
                if (p.id === savedCartItem.product_id) {
                  p.amount = savedCartItem.amount;
                  p.totalPrice = p.price * p.amount;
                  this.totalItems += p.amount;
                  this.totalPrice += p.totalPrice;
                  
                }
              });
            });
            this.getCartProducts(); // update cartProducts
          }
          
        
        this.cartAndShippingInitialized = true; // cannot use this func. more than once
      },
      err => console.log("ERROR @cartService @loadUserCart() " + err)
    );
  }

  // update wishListProducts from database
  loadUserWish() {
    return this.http.get<any>(`${environment.backURL}/wish`).subscribe(
      result => {
        console.log("current saved wish list of user: ");
        console.log(result[0]);
        
          result[0].forEach(wishedItem => {
            this.products.forEach(p => {
              if (p.id === wishedItem.product_id) {
                p.isWished = true;
                this.wishListProducts.push(p);
              }
            });
          });

          console.log('wishListProductsArr after loadUserWish(): ' , this.wishListProducts );
          
        
      },
      err => console.log("ERROR @cartService @loadUserWish() " + err)
    );
  }

  saveNewProduct(newProductObj){
    return this.http.post<any>(`${environment.backURL}/products`, newProductObj).subscribe(
      responseObj => {
        console.log('cartService >> saveNewProduct >> OK, product successfully saved: ', responseObj);
        this.products.push(responseObj);
      },
      err => console.log( 'cartService >> saveNewProduct >> error: ' , err )
    )
  }

  patchProduct(receivedProduct){   //{'id':13, 'price':200, 'collection':'Rittis'}
    this.products.forEach(product => {
      if(product.id === receivedProduct.id){

        //console.log('the product to be patched: ');
        //console.log(product);

        for(let keyRP in receivedProduct){
          for(let keyP in product){
            keyP === keyRP ? product[keyP] = receivedProduct[keyRP] : null
          }
        }

        //console.log('the patched product: ');
        //console.log(product);
      }
    })
        
  }

  cleanUpCart(){
    // !!!! IMPORTANT !!!!
    // on logout clean all these variables as otherways they stay in memory in client computer
    
    this.products = [];
    this.cartProducts = [];
    this.wishListProducts = [];
    this.shippingOptions = [];
    this.selectedShippingOption = { 'id':0 };
    this.totalItems = 0;
    this.totalPrice = 0;
  }

}
