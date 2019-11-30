import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingService } from './../../services/listing.service';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('productForm', { static:false }) productForm;

  addProductBtnClicked = false;
  editProductBtnClicked = false;
  manageOrdersBtnClicked = false;
  manageUsersBtnClicked = false;

  collectionSwitched = false;
  stoneSwitched = false;
  cutSwitched = false;
  materialSwitched = false;

  collections = [];
  stones = [];
  cuts = [];
  materials = [];
  sizes = [];

  

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

  async fillCuts(){
    await this.listingService.fillAllProducts();
    this.cuts = await this.listingService.getAllCuts();
  }

  async fillMaterials(){
    await this.listingService.fillAllProducts();
    this.materials = await this.listingService.getAllMaterials();
  }

  async fillSizes(){
    this.sizes = await this.listingService.getAllSizes();
  }

  productFormSubmit(formValue){
    console.log('submitted form value: ');
    console.table(formValue);
  }

  
 collectionSwitch(){
   this.collectionSwitched = !this.collectionSwitched;
 }

 stoneSwitch(){
  this.stoneSwitched = !this.stoneSwitched;
}

cutSwitch(){
  this.cutSwitched = !this.cutSwitched;
}

materialSwitch(){
  this.materialSwitched = !this.materialSwitched;
}


  

  ngOnInit() {
    
    this.fillCollections();
    this.fillStones();
    this.fillCuts();
    this.fillMaterials();
    this.fillSizes();
  }

}
