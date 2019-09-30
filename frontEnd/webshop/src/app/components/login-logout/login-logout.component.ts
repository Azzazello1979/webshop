import { AuthService } from './../../services/auth.service';
import { CartService } from './../../services/cart.service';

import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {

  buttonText: string = 'Login'; //initial value
  userObject: any = {};


  constructor(
    private auth: AuthService,
    private cartService:CartService,
    private router: Router
    ) { }


  wantsToRegister(){
    this.auth.toggle();
  }

  registerORloginORlogout() {
    if(this.auth.hasToken()){
      this.auth.logout(); // call logout service
      this.cartService.clearCart(); // empty cart on logout
      this.router.navigate(['/landingpage']);
      
    } else if(this.auth.wantsToRegister === true) { //call register service
      this.auth.register(this.userObject)
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
      this.auth.logIn(this.userObject)
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














  ngOnInit() {}

}
