import { Component, OnInit } from '@angular/core';
import { ListingService } from './../../services/listing.service';

@Component({
  selector: 'collection-filter',
  templateUrl: './collection-filter.component.html',
  styleUrls: ['./collection-filter.component.css']
})
export class CollectionFilterComponent implements OnInit {

  constructor(
    private listingService:ListingService
  ) { }

  ngOnInit() {
  }

}
