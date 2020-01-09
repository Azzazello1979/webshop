import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
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

  uploadSingleImage(fd){
    return this.http.post<any>(`${environment.backURL}/products`, fd, {
      reportProgress:true,
      observe: 'events'
    })
    .subscribe(
      event => {
        if(event.type === HttpEventType.UploadProgress){
          console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100) + '%');
        } else if(event.type === HttpEventType.Response){
          console.log('Full Http response received: ', event);
        }
      },
      rejection => console.log('rejection at uploading single image: ', rejection)
    )
  }

  updateProduct(patchObj){
    return this.http.patch<any>( `${environment.backURL}/products`, patchObj)
    .subscribe(
      responseObj => this.cartService.patchProduct(responseObj),
      error => console.log('Error@product-service.ts@updateProduct(): ' + error.message)
    )
  }

  deleteProduct(id:number){
    console.log('this is the id received by deleteProduct(): ', id);
    return this.http.delete<any>(`${environment.backURL}/products/${id}`, {responseType: 'json'})
    .subscribe(
      response => 
        { console.log('product-service: This is the response from backEnd after DELETE: ', response.id);
          this.cartService.products = this.cartService.products.filter(e => { e.id !== response.id });
          
        },
      error => console.log('Error@product-service.ts@deleteProduct(): ' + error.message)
    )
  }



}
