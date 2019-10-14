import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @ViewChild('shippingAddressForm', { static:false }) shippingAddressForm;
  @ViewChild('billingAddressForm', { static:false }) billingAddressForm;

  constructor(
    private cartService:CartService,
    private router:Router
  ) { }





  // check out the NgForm obj ...
  printNgForm(y){
    console.log(y);
  }
  // check out the NgModel obj ...  
  printNgModel(x){
    console.log(x);
  }




  shippingAddressSubmit(formValue){
    this.cartService.shippingAddressSubmit(formValue);
    this.shippingAddressForm.resetForm();
  }

  billingAddressSubmit(formValue){
    this.cartService.billingAddressSubmit(formValue);
    this.billingAddressForm.resetForm();
  }

  goToCheckout(){
    this.router.navigate(['/checkout']);
  }

  ngOnInit() {
  }

}
