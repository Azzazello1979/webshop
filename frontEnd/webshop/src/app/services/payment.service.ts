import { Injectable } from '@angular/core'
import { environment } from './../../environments/environment'
import { CartService } from './cart.service'
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  selectedPayment = { 'id':0 } // default selected payment obj
  order = {}
  paymentOptions: any = [] //bring in from database
  

  constructor(
    private cartService:CartService,
    private http:HttpClient
  ) { }

  getPaymentOptions(){
    return this.http.get<any>(`${environment.backURL}/paymentoptions`)
    .subscribe(
      res => {
        this.paymentOptions = res
        this.selectedPayment = this.paymentOptions[0]
        console.log('payment options loaded successfully')
      },
      err => console.log('Error @ payment.service getPaymentOptions(): ' + err.message)
    )
  }

  initPayment(paymentOption) {
    
    this.order = {
      'shippingOption': this.cartService.selectedShippingOption.id,
      'paymentOption': paymentOption.id,
      'shippingAddress': this.cartService.shippingAddress, 
      'products': this.fillProductsArray()
    }
    console.log('initPayment()...', this.order)
    //return this.saveOrder()
  }

  fillProductsArray() {
    // take only 'id' and 'amount' from product object
    let productsToSave = []
    this.cartService.cartProducts.forEach(e => {
      let obj = {}
      obj['id'] = e.id
      obj['amount'] = e.amount
      obj['price'] = e.price
      obj['size'] = e.size
      productsToSave.push(obj)
      //console.log('productsToSave: ', this.productsToSave)
    })
      return productsToSave
  }

  saveOrder() {
    // If billing address was given by user, append billing address object to order too
    this.cartService.billingAddress.country !== '' ? 
      this.order['billingAddress'] = this.cartService.billingAddress : null
      
    return this.http.post<any>(`${environment.backURL}/orders`, this.order)
  }


}
