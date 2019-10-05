import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; // REACTIVE forms with validation!




@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts = [];
  isSubmitted = false;
  shippingOptionsForm = this.fb.group({
    shipping: ['shipping', [Validators.required]]
  });


  constructor(
    private cartService: CartService,
    private router: Router,
    public fb:FormBuilder
  ) {}








  get myForm(){
    return this.shippingOptionsForm.get('shipping');
  }

  onSubmit(){
    this.isSubmitted = true;
    if(!this.shippingOptionsForm.valid){
      return false;
    }else{
      this.cartService.selectedShippingOptionName = this.shippingOptionsForm.value.shipping;
      console.log(this.cartService.selectedShippingOptionName);
      alert(JSON.stringify(this.shippingOptionsForm.value)); // this.shippingOptionsForm.value is an object
    }
  }


  add(productName){
    this.cartService.plus(productName);
  }

  deduct(productName){
    this.cartService.minus(productName);
  }

  proceedToCheckout(){
    this.router.navigate(['/checkout']);
  }

  clearCart(){
    this.cartService.clearCart();
  }

  
  ngOnInit(){

  }


}
