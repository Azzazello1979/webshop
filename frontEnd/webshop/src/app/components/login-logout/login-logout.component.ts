import { AuthService } from './../../services/auth.service';
import { CartService } from './../../services/cart.service';

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';





@Component({
  selector: 'login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnDestroy {

  
  userObject: any = {};
  registerSubscription: Subscription = new Subscription();
  loginSubscription: Subscription = new Subscription();


  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }


  wantsToRegister() {
    this.auth.toggle();
  }


  // register? login? logout? are you the admin?
  userIntent() { 

  // call logout service  
    if (this.auth.hasToken()) {
      this.auth.logout(); 
      this.cartService.clearCart(); // empty cart on logout
      this.router.navigate(['/landingpage']);


  //call register service    
    } else if (this.auth.wantsToRegister === true) { 
      if (this.userObject.email === undefined || this.userObject.password === undefined || typeof this.userObject.email !== 'string') {
        console.log(' email and password is needed ');
        return window.alert(' email and password is needed ');
      }
      this.registerSubscription = this.auth.register(this.userObject)
        .subscribe(
          (endPointResponseObj) => {
            localStorage.setItem('token', endPointResponseObj.token);
            this.auth.loggedIn = true;
            this.auth.buttonText = 'Logout';
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.log('error @ login-logout.component.ts register service observer: ');
            console.log(error);
            this.auth.loggedIn = false;
            this.auth.buttonText = 'Login';
            window.alert('That email is taken, please choose a different one!');
            return this.router.navigate(['/landingpage']);
          }
        );


  //call login service
    } else if (this.auth.wantsToRegister === false) { 
      if (this.userObject.email === undefined || this.userObject.password === undefined || typeof this.userObject.email !== 'string') {
        console.log(' email and password is needed ');
        return window.alert(' email and password is needed ');
      }
      this.loginSubscription = this.auth.logIn(this.userObject)
        .subscribe(
          (endPointResponseObj) => {
            localStorage.setItem('token', endPointResponseObj.token);
            this.auth.loggedIn = true;
            this.auth.buttonText = 'Logout';

            // regular user or admin?
            this.auth.adminLoggedIn ? this.router.navigate(['/add-product']) : this.router.navigate(['/dashboard']);
            
          },
          (error) => {
            console.log('error @ login-logout.component.ts login service observer: ');
            console.log(error);
            this.auth.loggedIn = false;
            this.auth.buttonText = 'Login';
            window.alert('The supplied email or password is wrong!');
            return this.router.navigate(['/landingpage']);
          }
        );
    }

    this.userObject = {};
  }


  // prevent mem. leaks, without this, component is destroyed on navigating away but the
  // observable<-->observer lives on ... ---> use async pipe !!! 
  ngOnDestroy() {
    this.registerSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

}
