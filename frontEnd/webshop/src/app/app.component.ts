import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'webshop';

  constructor(
    private auth:AuthService
  ){}

  ngOnInit(){

    // prevent logging out user if page is reloaded(=component is destroyed)
    if(this.auth.hasToken()){
      this.auth.loggedIn = true;
      this.auth.buttonText = 'Logout';
    }else{
      this.auth.loggedIn = false;
    }   
  }
}
