import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products = []
  private productsUpdated = new BehaviorSubject<any[]>([])

  constructor(
    private http:HttpClient
  ) { }

  getProductsUpdatedListener(){
    return this.productsUpdated.asObservable()
  }

  // this is the point of entry for products array from DB
  getProductsFromDB(){
    return this.http.get<any>(`${environment.backURL}/products`)
    .subscribe(
      productsFromDB => {
        this.products = productsFromDB
        this.productsUpdated.next([...this.products])
      },
      error => console.log(error)
    )
  }

  addNewProductToDB(newProductObj){
    return this.http.post<any>(`${environment.backURL}/products`, newProductObj)
    .subscribe(
      addedProduct => {
        this.products.push(addedProduct)
        this.productsUpdated.next([...this.products])
      },
      error => console.log(error)
    )
  }

  updateProduct(patchObj){
    return this.http.patch<any>( `${environment.backURL}/products`, patchObj)
    .subscribe(
      responseObj => {
        this.patchProduct(responseObj)
        this.productsUpdated.next([...this.products])
      },
      error => console.log(error)
    )
  }

  deleteProduct(id:number){
    return this.http.delete<any>(`${environment.backURL}/products/${id}`, {responseType: 'json'})
    .subscribe(
      response => {
        this.products = this.products.filter(e => { e.id !== response.id })
        this.productsUpdated.next([...this.products])
      },
      error => console.log(error)
    )
  }

  patchProduct(receivedProduct){   
    this.products.forEach(product => {
      if(product.id === receivedProduct.id){
        for(let keyRP in receivedProduct){
          for(let keyP in product){
            keyP === keyRP ? product[keyP] = receivedProduct[keyRP] : null
          }
        }
      }
    })
    this.productsUpdated.next([...this.products])  
  }

  

}

  // NOTES: 
  // this.productsUpdated is a BehaviorSubject, its private, so nobody can access and listen to it
  // BehaviorSubject.asObservable()... turns it into a passive
  // observable that can be listened to 
  // but one cannot call .next() on it accidentally
  // So although this.productsUpdated is emitting, nobody subscribes to it,
  // however they subscribe to its passive, 
  // observable style version: this.productsUpdated.asObservable()
