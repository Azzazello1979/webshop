import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../../services/orders.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any[] = [];

  constructor(
    private ordersService:OrdersService
  ) { }

  ngOnInit() {
    this.ordersService.loadOrders()
    .subscribe(
      ordersArr => this.orders = ordersArr,
      rejected => console.log('Promise rejected @ loadOrders(): ' + rejected.message)
    )
  }

}
