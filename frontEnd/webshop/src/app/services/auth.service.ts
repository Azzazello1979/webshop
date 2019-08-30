import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn:boolean = false;
  public wantsToRegister:boolean = false;
  public HttpOptions:any = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }



  register(userObject){
    return this.http.post<any>(
      `${environment.backURL}/register`, 
      userObject, 
      this.HttpOptions
      )
  }



  wantsToRegisterClicked(){
    this.wantsToRegister = true;
    let observable = new Observable<boolean>(
      observer => {
        observer.next(this.wantsToRegister);
      }
    );
    return observable;
  }

  status(){
    let observable = new Observable<boolean>(
      observer => {
        observer.next(this.loggedIn);
      }
    );
    return observable;
  }

  logIn(){
    //console.log(`at service login, this loggedIn: ${this.loggedIn}`);
    this.loggedIn = true;
    let observable = new Observable<boolean>(
      observer => {
        observer.next(this.loggedIn);
      }
    );
    return observable;
  }

  logout(){
    //console.log(`at service logout, this loggedIn: ${this.loggedIn}`);
    this.loggedIn = false;
    let observable = new Observable<boolean>(
      observer => {
        observer.next(this.loggedIn);
      }
    );
    return observable;
  }




}