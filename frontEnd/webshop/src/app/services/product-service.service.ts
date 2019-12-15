import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient
  ) { }

  updateProduct(patchObj){
    //return this.http.patch( `${environment.backURL}/products`, patchObj )
    console.log('service: will send this patch: ');
    console.log(patchObj);
  }



}
