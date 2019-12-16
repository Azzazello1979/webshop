import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { CartService } from './../services/cart.service';
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient,
    private cartService:CartService
  ) { }

  updateProduct(patchObj){
    console.log(patchObj);
    //this.cartService.patchProduct(patchObj);

    /* return this.http.patch<any>( `${environment.backURL}/products`, patchObj )
    .subscribe(
      responseObj => this.cartService.patchProduct(responseObj),
      error => console.log('Error@product-service.ts@updateProduct(): ' + error.message)
    ) */
      
  }



}
