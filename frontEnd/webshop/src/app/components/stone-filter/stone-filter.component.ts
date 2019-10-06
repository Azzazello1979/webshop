import { Component, OnInit } from '@angular/core';
import { ListingService } from './../../services/listing.service';

@Component({
  selector: 'stone-filter',
  templateUrl: './stone-filter.component.html',
  styleUrls: ['./stone-filter.component.css']
})
export class StoneFilterComponent implements OnInit {

  constructor(
    private listingService:ListingService
  ) { }

  ngOnInit() {
  }

}
