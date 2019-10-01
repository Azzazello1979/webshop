import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'collection-filter',
  templateUrl: './collection-filter.component.html',
  styleUrls: ['./collection-filter.component.css']
})
export class CollectionFilterComponent implements OnInit {

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit() {
  }

}
