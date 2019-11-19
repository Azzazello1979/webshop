import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListingService } from './../../services/listing.service';

@Component({
  selector: 'price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent implements OnInit {



  constructor(
    private listingService:ListingService
  ) { }


  minChanged(){
    this.listingService.someFilterApplied = true;
  }

  maxChanged(){
    this.listingService.someFilterApplied = true;
  }

  ngOnInit() {
  }

}
