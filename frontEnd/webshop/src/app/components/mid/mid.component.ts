import { ListingService } from 'src/app/services/listing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css']
})
export class MidComponent implements OnInit {

  constructor(
    private listingService:ListingService
  ) { }


  ngOnInit() {
    this.listingService.initProducts();
  }
  
}
