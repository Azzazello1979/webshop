import { Component, OnInit } from '@angular/core';
import { ListingService } from './../../services/listing.service';

@Component({
  selector: 'right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent implements OnInit {

  constructor(
    private listingService:ListingService
  ) { }

  ngOnInit() {
  }

}
