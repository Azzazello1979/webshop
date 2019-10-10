import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @ViewChild('shippingAddressForm', { static:false }) shippingAddressFormValue;
  @ViewChild('billingAddressForm', { static:false }) billingAddressFormValue;

  constructor(
    private cartService:CartService
  ) { }

  shippingAddressSubmit(formValue){
    this.cartService.shippingAddressSubmit(formValue);
    this.shippingAddressFormValue.resetForm();
  }

  billingAddressSubmit(formValue){
    this.cartService.billingAddressSubmit(formValue);
    this.billingAddressFormValue.resetForm();
  }


  ngOnInit() {
  }

}
