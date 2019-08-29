import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn:boolean = false;

  constructor() { }

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
