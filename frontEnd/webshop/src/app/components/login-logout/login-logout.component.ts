import { AuthService } from './../../services/auth.service';
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
    private router: Router
    ) { }


  registerORloginORlogout() {
    if (this.auth.hasToken()){
      this.auth.logout(); // call logout service
    } else if (this.auth.wantsToRegister === true) { //call register service
      this.auth.register(this.userObject)
        .subscribe(endPointResponseObj => {
          localStorage.setItem('token', endPointResponseObj.token);
        });
    } else if (this.auth.wantsToRegister === false){ //call login service
      this.auth.logIn(this.userObject)
      .subscribe(endPointResponseObj => {
        localStorage.setItem('token', endPointResponseObj.token);
      })
    }
  }



  wantsToRegisterOrLogin() {
    if (this.auth.hasToken()){
      this.buttonText = 'Logout';
    } else if (this.auth.wantsToRegister === true) {
      this.buttonText = 'Register';
    } else if (this.auth.wantsToRegister === false) {
      this.buttonText = 'Login';
    }
  }










  ngOnInit() {}

}
