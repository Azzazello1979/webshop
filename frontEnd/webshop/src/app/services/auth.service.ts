import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:boolean = false;
  wantsToRegister:boolean = false;
  tryThis:string = 'Hola!';
  

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }



  hasToken(){
    if(localStorage.getItem('token')){
      return true;
    } else {
      return false;
    }
  }


  register(userObject){
    return this.http.post<any>(`${environment.backURL}/register`, userObject);
  }


  logIn(userObject){
    this.loggedIn = true;
    return this.http.post<any>(`${environment.backURL}/login`, userObject);
  }


  logout(){
    //console.log(`at service logout, this loggedIn: ${this.loggedIn}`);
    localStorage.removeItem('token');
    this.wantsToRegister = false;
    this.loggedIn = false;
  }




}
