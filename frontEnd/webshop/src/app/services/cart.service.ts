import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { environment } from "./../../environments/environment"
import { AuthService } from "./auth.service"
import { ListingService } from "./listing.service"

@Injectable({
  providedIn: "root"
})
export class CartService {
  
  shippingOptions = [];
  selectedShippingOption;

  wishListProducts = [];

  shippingAddress;
  addressSubmitted = false;

  billingAddress;
  billingAddressIsDifferentFromShippingAddress = false;

  cartProducts = [];
  totalItemsInCart = 0;
  totalPriceOfAllCartItems = 0;

  UIDarray = [];


  
  constructor(
    private http: HttpClient, 
    private auth: AuthService,
    private listingService: ListingService
    ) {}

  
  

  initShippingOptions(){
    return this.http.get<any>(`${environment.backURL}/shippingoptions`)
    .subscribe(
      res => {
        console.log('initShippingOptions()@CART.SERVICE: shipping options loaded: ', res);
        this.shippingOptions = res;
        this.selectedShippingOption = res[0];
        console.log('initShippingOptions()@CART.SERVICE: this.selectedShippingOption is: ', this.selectedShippingOption)
        this.loadUserCartAndShipping()
      },
      err => console.log('cartService: initShippingOptions() error: ', err)
    )
  }

  addToWish(product) {
    let wishListProductsIds = this.wishListProducts.map(e => e.id)
    
    if(!wishListProductsIds.includes(product.id)){
      this.wishListProducts.push(product)
      console.log('addToWish()@CART.SERVICE: wishList items grown: ', this.wishListProducts)
    }
    console.log('addToWish()@CART.SERVICE: wishList items: ', this.wishListProducts)
  }

  removeFromWish(product) {
    this.wishListProducts = this.wishListProducts.filter(
      e => e.id !== product.id
    )
    console.log("removeFromWish()@CART.SERVICE: wishList items shorted: ", this.wishListProducts)
  }

  shippingAddressSubmit(formValue) {
    this.shippingAddress = formValue;
    this.addressSubmitted = true;
    console.log("shippingAddressSubmit()@CART.SERVICE: shippingAddress received: ", this.shippingAddress);
    window.alert("Your shipping address is recorded");
  }

  billingAddressSubmit(formValue) {
    this.billingAddress = formValue;
    console.log("billingAddressSubmit()@CART.SERVICE: billingAddress received: ", this.billingAddress);
    window.alert("Your billing address is recorded");
  }

  toggleShippingBillingAddress() {
    this.billingAddressIsDifferentFromShippingAddress = !this.billingAddressIsDifferentFromShippingAddress;
  }

  countCartItems():number{
    let amounts = [];
    if(this.cartProducts.length > 0){
      this.cartProducts.forEach( product => {
        amounts.push(product.amount)
      });
      this.totalItemsInCart = amounts.length > 0 ? amounts.reduce((acc, curr) => acc + curr) : 0;
    }
    console.log('countCartItems()@CART.SERVICE: totalItemsInCart: ' + this.totalItemsInCart);
    console.log('countCartItems()@CART.SERVICE: cartProducts: ', this.cartProducts);
    return this.totalItemsInCart;
  }

  getTotalPrice():number{
    this.totalPriceOfAllCartItems = 0;
    let amounts = [];
    if(this.cartProducts.length > 0){
      this.cartProducts.forEach(e => {
        amounts.push((e.price*e.amount))
     })
     this.totalPriceOfAllCartItems = amounts.reduce((acc,curr) => acc + curr)
    }
    

    console.log('getTotalPrice()@CART.SERVICE: totalPriceOfAllCartItems: ' + this.totalPriceOfAllCartItems)
    return this.totalPriceOfAllCartItems;
  }

  getCartProducts() {
    // get products added to the cart
    return this.cartProducts;
    //console.log(this.cartProducts.length);
  }

  plus(productID:number, size:number) {
    //console.log('plus()@CART.SERVICE: productID incoming: ' + productID, 'size incoming: ' + size)
    let objToCart = {};
    this.listingService.allProducts.forEach(product => {
      if(product.id === productID){
        objToCart = {...product}
      } 
    });

    //console.log(objToCart)

    objToCart['size'] = size;
    objToCart['UID'] = `${objToCart['id']}_${objToCart['size']}`; // UID is new property, made up of id_size, this uniquely identifies object
    //console.log("objToCart['UID'] is: " + objToCart['UID']);
    
    if(!this.UIDarray.includes(objToCart['UID'])){
      this.UIDarray.push(objToCart['UID']);
      objToCart['amount'] = 1;
      this.cartProducts.push(objToCart);
      console.log('plus()@CART.SERVICE: New UID, added to cart. cartProducts: ', this.cartProducts);
    } else {
      this.cartProducts.forEach(cp => {
        cp['UID'] === objToCart['UID'] ? cp['amount'] ++ : null ;
      })
      console.log('plus()@CART.SERVICE: Same UID, incremented. cartProducts: ', this.cartProducts);
    }
    this.countCartItems()
    this.getTotalPrice()
}

  increment(productUID:string){
    this.cartProducts.forEach(cartProduct => {
      if(cartProduct['UID'] === productUID){
        cartProduct['amount'] ++ ;
        console.log('increment()@CART.SERVICE: incremented amount. cartProducts: ', this.cartProducts);
      } 
    })
    this.countCartItems()
    this.getTotalPrice()
  }

  decrement(incomingUID:string){ // 25_12
    this.cartProducts.forEach(cartProduct => {
     if(cartProduct.UID === incomingUID){ 
      if(cartProduct.amount > 1){
        cartProduct.amount -- ;
        console.log('decrement()@CART.SERVICE: decremented amount. cartProducts: ', this.cartProducts);
      } else {
        this.cartProducts = this.cartProducts.filter(cp => cp.UID !== incomingUID);
        this.UIDarray = this.UIDarray.filter(uid => uid !== incomingUID);
        this.totalItemsInCart = 0;
        console.log('decrement()@CART.SERVICE: removed last item. cartProducts: ', this.cartProducts);
      }
     }
    })
        this.countCartItems()
        this.getTotalPrice()
  }

  clearCart() {
    this.cartProducts = [];
    this.totalItemsInCart = 0;
    console.log('clearCart()@CART.SERVICE: cart cleared.')
  }

  // start LOGOUT procedure:
  // * saveCart()
  // * save WishList()
  // * clean up cart service variables
  // because this method is called on logout, there is no need to unsubscribe

  // save current user cart items,amount & shipping preference to DB
  saveCart() {
    console.log('saveCart()@CART.SERVICE: this.cartProducts: ', this.cartProducts)
    console.log('saveCart()@CART.SERVICE: this.selectedShippingOption: ', this.selectedShippingOption)
      let info = {
        'cartProducts': this.cartProducts,
        'shippingOption': this.selectedShippingOption
      };
      return this.http.post<any>(`${environment.backURL}/cart`, info)
      .subscribe(
        res => {
          console.log('saveCart()@CART.SERVICE: response from backEnd: ', res);
          this.saveWish();
        },
        err => {
          console.log('saveCart()@CART.SERVICE: response from backEnd: ', err);
          this.saveWish();
        }
          
      );
  }

  // now save current wish list to db and finally call this.auth.logout() that clears the token an sets flags in auth.service
  saveWish() {
      return this.http.post<any>(`${environment.backURL}/wish`, this.wishListProducts)
      .subscribe(
        res => {
          console.log('saveWish()@CART.SERVICE: response from backEnd: ', res);
          this.auth.logout(); // call this last, it clears token, and token is needed by above save methods
        },
        err =>
        console.log('saveWish()@CART.SERVICE: response from backEnd: ', err)
        );
  }

  loadUserCartAndShipping() {
  this.selectedShippingOption = [];
  this.cartProducts = [];
  this.UIDarray = [];
  return this.http.get<any>(`${environment.backURL}/cart`)
    .subscribe(
      result => {
        console.log("loadUserCartAndShipping()@CART.SERVICE: current saved cart of user (from DB): ", result)
        let selectedShippingOptionArr = this.shippingOptions.filter(e => e.id === result.shippingID)
        console.log('loadUserCartAndShipping()@CART.SERVICE: result.shippingID:', result.shippingID)
        console.log('loadUserCartAndShipping()@CART.SERVICE: selectedShippingOptionArr:', selectedShippingOptionArr )
        this.selectedShippingOption = selectedShippingOptionArr[0]
        console.log('loadUserCartAndShipping()@CART.SERVICE: this.selectedShippingOption after loadUserCartAndShipping(): ', this.selectedShippingOption)
        this.cartProducts = result.savedCartProducts
        console.log('loadUserCartAndShipping()@CART.SERVICE: this.cartProducts after loadUserCartAndShipping(): ', this.cartProducts)
        this.UIDarray = this.cartProducts.map(e => e.UID)
        console.log('loadUserCartAndShipping()@CART.SERVICE: this.UIDArray after loadUserCartAndShipping(): ', this.UIDarray)
        this.countCartItems()
        this.getTotalPrice()
      },
      err => console.log('loadUserCartAndShipping()@CART.SERVICE: ', err)
    )
  }

  // update wishListProducts from database
  loadUserWish() {
    this.wishListProducts = [];
    return this.http.get<any>(`${environment.backURL}/wish`).subscribe(
      result => {
        console.log("loadUserWish()@CART.SERVICE: ", result[0]);
        
          result[0].forEach(wishedItem => {
            this.cartProducts.forEach(p => {
              if (p.id === wishedItem.product_id) {
                p.isWished = true;
                this.wishListProducts.push(p);
              }
            });
          });

          console.log('loadUserWish()@CART.SERVICE: wishListProducts after loadUserWish(): ' , this.wishListProducts );
          
        
      },
      err => console.log("ERROR @cartService @loadUserWish() " + err)
    );
  }

  

  

  

}
