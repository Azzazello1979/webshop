
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'user-greet',
  templateUrl: './user-greet.component.html',
  styleUrls: ['./user-greet.component.css']
})
export class UserGreetComponent implements OnInit {

  currentUser: string = 'stranger';
  userPrompt: string = 'Please log in ';
  wantsToRegister: boolean = false;


  constructor(private auth: AuthService) {

  }

  getGreeting() {
    this.auth.status().subscribe(result => {
      if (result === false) {
        return this.userPrompt = 'Please log in ';
      } else if (result === true) {
        return this.userPrompt = 'Welcome back ';
      }
    });
  }

  register(){
    this.auth.wantsToRegisterClicked()
    .subscribe(result => {
      this.wantsToRegister = result;
    });
  }



  ngOnInit() {

    setInterval(() => { 
      this.getGreeting();
    }, 500);

  }


}
