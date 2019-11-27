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
    //console.log(this.collections);
  }

  ngOnInit() {
    this.fillCollections();
  }

}
