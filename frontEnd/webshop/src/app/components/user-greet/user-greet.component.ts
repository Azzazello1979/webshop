
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'user-greet',
  templateUrl: './user-greet.component.html',
  styleUrls: ['./user-greet.component.css']
})
export class UserGreetComponent implements OnInit {

  currentUser: string = 'Balint';
  userPrompt: string = 'Hello';


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




  ngOnInit() {

    setInterval(() => { 
      this.getGreeting();
    }, 500);

  }


}
