import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {

  loggedIn: boolean = false;
  buttonText: string = 'Login';
  userObject: any = {};


  constructor(
    private auth: AuthService,
    private router: Router
    ) { }


  registerORlogin() {
    if (this.auth.wantsToRegister === true) { //call register service
      this.auth.register(this.userObject)
        .subscribe(endPointResponseObj => {
          localStorage.setItem('accessToken', endPointResponseObj.accessToken);
          /*this.router.navigate(['/member']);*/
        },
          (err:any) => console.log(err.message)
        );
    } else if (this.auth.wantsToRegister === false){ //call login service
      // implement login call to service
    }

  }

  wantsToRegisterOrLogin() {
    if (this.auth.wantsToRegister === true) {
      this.buttonText = 'Register';
    } else if (this.auth.wantsToRegister === false) {
      this.buttonText = 'Login';
    }
  }

  logIn() {
    //console.log('login');
    this.auth.logIn().subscribe(result => {
      this.loggedIn = result;
    });
  }

  logOut() {
    //console.log('logout');
    this.auth.logout().subscribe(result => {
      this.loggedIn = result;
    });
  }


  ngOnInit() {

    setInterval(() => {
      this.wantsToRegisterOrLogin();
    }, 500)

  }



}
