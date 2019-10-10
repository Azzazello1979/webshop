import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit() {
  }

}
