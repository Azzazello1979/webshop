
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'user-greet',
  templateUrl: './user-greet.component.html',
  styleUrls: ['./user-greet.component.css']
})
export class UserGreetComponent implements OnInit {


  constructor(private auth:AuthService) { }

  wantsToRegister(){
    this.auth.toggle();
  }






  ngOnInit() { }

}
