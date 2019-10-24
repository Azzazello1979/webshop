import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = false;
  wantsToRegister: boolean = false;
  buttonText: string = 'Login';



  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  toggle() {
    this.wantsToRegister = !this.wantsToRegister;
    if (this.wantsToRegister === true) {
      this.buttonText = 'Register';
    } else if (this.wantsToRegister === false) {
      this.buttonText = 'Login';
    } else if (this.loggedIn === true) {
      this.buttonText = 'Logout';
    }
  }

  hasToken() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }


  getToken() {
    return localStorage.getItem('token');
  }


  register(userObject) {
    return this.http.post<any>(`${environment.backURL}/register`, userObject);
  }


  logIn(userObject) {
    return this.http.post<any>(`${environment.backURL}/login`, userObject);
  }


  logout() {
    localStorage.removeItem('token');
    this.wantsToRegister = false;
    this.loggedIn = false;
    this.buttonText = 'Login';
  }




}
