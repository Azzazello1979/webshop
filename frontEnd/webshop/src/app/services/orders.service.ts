import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders = [
    { 
      'id':1,
      'shippingName':'FedEx',
      'paymentName':'PayPal',
      'user_id':1,
      'orderCreated':'2019-12-24T08:30:31Z',
      'total':219.9,
      'suborder':[
        { 
          'id':1,
          'product_id':13,
          'img':'./../../assets/images/collections/rittis/Rittis-1.jpg',
          'productName':'Rittis-1',
          'amount':1,
          'size':7.5,
          'price':59.95
         },
         { 
          'id':2,
          'product_id':14,
          'img':'./../../assets/images/collections/rittis/Rittis-2.jpg',
          'productName':'Rittis-2',
          'amount':1,
          'size':8.5,
          'price':159.95
         }
      ]
     },
     { 
      'id':2,
      'shippingName':'free',
      'paymentName':'DHL',
      'user_id':3,
      'orderCreated':'2019-12-25T09:11:45Z',
      'total':256.9,
      'suborder':[
        { 
          'id':1,
          'product_id':15,
          'img':'./../../assets/images/collections/rittis/Rittis-3.jpg',
          'productName':'Rittis-3',
          'amount':1,
          'size':5.5,
          'price':33.95
         },
         { 
          'id':2,
          'product_id':16,
          'img':'./../../assets/images/collections/biafin/Biafin-1.jpg',
          'productName':'Biafin-1',
          'amount':1,
          'size':9.5,
          'price':222.95
         }
      ]
     }
  ]

  constructor() { }
}
