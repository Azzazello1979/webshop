import { Component, OnInit } from '@angular/core';
import { ListingService } from './../../services/listing.service';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  addProductBtnClicked = false;
  editProductBtnClicked = false;
  manageOrdersBtnClicked = false;
  manageUsersBtnClicked = false;

  collections = [];
  stones = [];

  constructor(
    private listingService: ListingService
  ) { }


  addProductCLK(){
    this.addProductBtnClicked = !this.addProductBtnClicked;

  }

  editProductCLK(){
    this.editProductBtnClicked = !this.editProductBtnClicked;
  }

  manageOrdersCLK(){
    this.manageOrdersBtnClicked = !this.manageOrdersBtnClicked;
  }

  manageUsersCLK(){
    this.manageUsersBtnClicked = !this.manageUsersBtnClicked;
  }

  async fillCollections(){
    await this.listingService.fillAllProducts();
    this.collections = await this.listingService.getAllCollections();
  }

  async fillStones(){
    await this.listingService.fillAllProducts();
    this.stones = await this.listingService.getAllStones();
  }

  ngOnInit() {
    this.fillCollections();
    this.fillStones();
  }

}
