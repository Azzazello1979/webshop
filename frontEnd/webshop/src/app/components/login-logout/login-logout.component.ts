import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {

  loggedIn: boolean = false;
  buttonText: string = 'Register';


  constructor(private auth: AuthService) { }



    logIn(){
      //console.log('login');
      this.auth.logIn().subscribe(result => {
        this.loggedIn = result;
      });
    }

    logOut(){
      //console.log('logout');
      this.auth.logout().subscribe(result => {
        this.loggedIn = result;
      });
    }


    ngOnInit() {
      


    }

  

}
