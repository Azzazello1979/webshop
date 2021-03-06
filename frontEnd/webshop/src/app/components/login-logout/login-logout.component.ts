import { UserObject } from "./../../interfaces/userobject"
import { NgForm } from "@angular/forms"
import { AuthService } from "./../../services/auth.service"
import { ProductService } from "./../../services/product-service.service"
import { CartService } from "./../../services/cart.service"
import { Component, OnDestroy } from "@angular/core"
import { Router } from "@angular/router"
import { Subscription } from "rxjs"

@Component({
  selector: "login-logout",
  templateUrl: "./login-logout.component.html",
  styleUrls: ["./login-logout.component.css"]
})
export class LoginLogoutComponent implements OnDestroy {

  userObject:UserObject = {
    'email': "",
    'password': ""
  };
  registerSubscription: Subscription = new Subscription();
  loginSubscription: Subscription = new Subscription();

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private cartService:CartService,
    private router: Router
  ) {}

  wantsToRegister() {
    this.auth.toggle();
  }

  logout(){
    this.cartService.saveCart();
    this.router.navigate(["/landingpage"]);
  }

  register(registerLoginForm){
    if(!registerLoginForm.valid){
      console.log("Email and password is needed, they cannot be empty")
      return window.alert("Email and password is needed, they cannot be empty")
    } else if( this.userObject.email.split("").includes(" ") || this.userObject.password.split("").includes(" ") ) {
      console.log("email or password cannot have space")
      return window.alert("email or password cannot have space")
    }

    this.registerSubscription = this.auth.register(this.userObject)
    .subscribe(
      endPointResponseObj => {
        localStorage.setItem("token", endPointResponseObj.token);
        this.auth.loggedIn = true;
        this.auth.buttonText = "Logout";
        this.productService.getProductsFromDB();
        this.router.navigate(["/dashboard"]);
      },
      error => {
        console.log(error);
        this.auth.loggedIn = false;
        this.auth.buttonText = "Login";
        window.alert("That email is taken, please choose a different one!");
        return this.router.navigate(["/landingpage"]);
      }
    )
  }

  login(registerLoginForm){
    if(!registerLoginForm.valid){
      console.log("email and password is needed")
      return window.alert("email and password is needed")
    }

    this.loginSubscription = this.auth.logIn(this.userObject)
    .subscribe(
      endPointResponseObj => {
          localStorage.setItem("token", endPointResponseObj.token);
          this.auth.loggedIn = true;
          this.auth.buttonText = "Logout";
          this.productService.getProductsFromDB();

        // regular user or admin?
        if(this.auth.adminLoggedIn){
          this.router.navigate(["/admin"]);
        } else {
          this.cartService.initShippingOptions();
          this.cartService.loadUserWish();
          this.router.navigate(["/dashboard"]);
      }
        },
      error => {
        console.log(error)
        this.auth.loggedIn = false
        this.auth.buttonText = "Login"
        window.alert("The supplied email or password is wrong!")
        return this.router.navigate(["/landingpage"])
      }
    )
  }

  // register? login? logout? are you the admin?
  userIntent(registerLoginForm: NgForm) {

    this.userObject.email = registerLoginForm.value.email;
    this.userObject.password = registerLoginForm.value.password;

    this.auth.hasToken() ? this.logout() :
      this.auth.wantsToRegister ? this.register(registerLoginForm) : this.login(registerLoginForm);

    this.userObject = {
      'email': "",
      'password': ""
    }

  }
    
  ngOnDestroy() {
    this.registerSubscription.unsubscribe()
    this.loginSubscription.unsubscribe()
  }
}
