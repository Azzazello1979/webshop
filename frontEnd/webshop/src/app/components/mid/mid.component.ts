import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css']
})
export class MidComponent implements OnInit {

  hasToken:boolean = false;

  constructor(private auth:AuthService) { }

  checkToken(){
    this.hasToken = this.auth.hasToken();
  }

  ngOnInit() {

    setInterval(() => {
      this.checkToken()
    },500)
    
  }

}
