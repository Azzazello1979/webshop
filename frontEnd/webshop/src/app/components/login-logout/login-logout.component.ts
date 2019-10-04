import { AuthService } from './../../services/auth.service';
import { CartService } from './../../services/cart.service';

import { Component, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnDestroy {

  buttonText: string = 'Login'; //initial value
  userObject: any = {};
  registerSubscription:Subscription = new Subscription();
  loginSubscription:Subscription = new Subscription();


  constructor(
    private auth: AuthService,
    private cartService:CartService,
    private router: Router
    ) { }


  wantsToRegister(){
    this.auth.toggle();
  }

  userIntent() { // register? login? logout?
    if(this.auth.hasToken()){
      this.auth.logout(); // call logout service
      this.cartService.clearCart(); // empty cart on logout
      this.router.navigate(['/landingpage']);
      
    } else if(this.auth.wantsToRegister === true) { //call register service
      this.registerSubscription = this.auth.register(this.userObject)
        .subscribe(
          (endPointResponseObj) => {
          localStorage.setItem('token', endPointResponseObj.token);
          this.router.navigate(['/dashboard']);
        },
          (error) => {
            console.log(error);
          }
        );
        
    } else if(this.auth.wantsToRegister === false){ //call login service
      this.loginSubscription = this.auth.logIn(this.userObject)
      .subscribe(
        (endPointResponseObj) => {
        localStorage.setItem('token', endPointResponseObj.token);
        this.router.navigate(['/dashboard']);
      },
        (error) => {
          console.log(error);
        }
      );
    }

    this.userObject = {};
  }

  // prevent mem. leaks, without this, component is destroyed on navigating away but the
  // observable<-->observer lives on ... ---> use async pipe !!! 
  ngOnDestroy(){  
    this.registerSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

}
