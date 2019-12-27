import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders = [
    { 
      'id':1,
      'shipping_id':1,
      'user_id':1,
      'payment_id':1,
      'orderCreated':2019-12-24,
      'suborder':[
        { 
          'id':55,
          'product_id':13,
          'amount':1,
          'size':7.5,
          'price':59.95
         },
         { 
          'id':56,
          'product_id':14,
          'amount':1,
          'size':8.5,
          'price':159.95
         }
      ]
     },
     { 
      'id':2,
      'shipping_id':4,
      'user_id':3,
      'payment_id':2,
      'orderCreated':2019-12-25,
      'suborder':[
        { 
          'id':57,
          'product_id':15,
          'amount':1,
          'size':5.5,
          'price':33.95
         },
         { 
          'id':58,
          'product_id':16,
          'amount':1,
          'size':9.5,
          'price':222.95
         }
      ]
     }
  ]

  constructor() { }
}
