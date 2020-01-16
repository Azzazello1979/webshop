import { Injectable } from '@angular/core'
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt' // decode JWT token on FrontEnd!
import { UserObject } from './../interfaces/userobject'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserId: number
  currentUseremail: string
  loggedIn: boolean = false
  wantsToRegister: boolean = false
  buttonText: string = 'Login'

  adminEmail = 'balint.haui@gmail.com' //get from database
  adminLoggedIn = false

  // get current decoded token 
  helper = new JwtHelperService
  currentToken = this.getToken()
  decodedToken = this.helper.decodeToken(this.currentToken)

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  toggle() {
    this.wantsToRegister = !this.wantsToRegister
    if (this.wantsToRegister) {
      this.buttonText = 'Register'
    } else if (!this.wantsToRegister) {
      this.buttonText = 'Login'
    } else if (this.loggedIn) {
      this.buttonText = 'Logout'
    }
  }

  hasToken() {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getCurrentUserId(){
    // get current user id from token
    return this.currentUserId = this.decodedToken.id
  }

  getCurrentUserEmail(){
    // get current user email from token
    return this.currentUseremail = this.decodedToken.email
  }

  register(userObject:UserObject) {
    return this.http.post<any>(`${environment.backURL}/register`, userObject)
  }

  logIn(userObject:UserObject) {
    userObject.email === this.adminEmail ? this.adminLoggedIn = true : this.adminLoggedIn = false
    return this.http.post<any>(`${environment.backURL}/login`, userObject)
  }

  logout() {
    this.wantsToRegister = false
    this.loggedIn = false
    this.buttonText = 'Login'
    localStorage.removeItem('token')
  }

}
