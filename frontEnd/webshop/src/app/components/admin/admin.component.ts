import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingService } from './../../services/listing.service';
import { CartService } from './../../services/cart.service';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('productForm', { static:false }) productForm;
  @ViewChild('editProductForm', { static:false }) editProductForm;

  // this is how you access the queried node's values with @ViewChild:
  // this.editProductForm.value.productName (form will have value only after submitted)
  // This is read-only!

  defaultProductName = "YOOOO";

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
    private listingService: ListingService,
    private cartService: CartService
  ) { }


  addProductCLK(){
    this.addProductBtnClicked = !this.addProductBtnClicked;
    this.editProductBtnClicked = false;
    this.manageOrdersBtnClicked = false;
    this.manageUsersBtnClicked = false;
  }

  editProductCLK(){
    this.editProductBtnClicked = !this.editProductBtnClicked;
    this.addProductBtnClicked = false;
    this.manageOrdersBtnClicked = false;
    this.manageUsersBtnClicked = false;
  }

  manageOrdersCLK(){
    this.manageOrdersBtnClicked = !this.manageOrdersBtnClicked;
    this.addProductBtnClicked = false;
    this.editProductBtnClicked = false;
    this.manageUsersBtnClicked = false;
  }

  manageUsersCLK(){
    this.manageUsersBtnClicked = !this.manageUsersBtnClicked;
    this.addProductBtnClicked = false;
    this.editProductBtnClicked = false;
    this.manageOrdersBtnClicked = false;
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
    // sanitize data received from form, before passing it to service

    //console.log('add product form value: ');
    //console.table(formValue);
    let imgFileName = formValue.img.substring(12);
    let theCollection = formValue.collection.toLowerCase();
    let constructedImgPath = `./../../assets/images/collections/${theCollection}/${imgFileName}`;
    //console.log(constructedImgPath);
    let newProductObj = {
      'collection': theCollection,
      'productName': formValue.productName,
      'price': formValue.price,
      'stone': formValue.stone,
      'carat': formValue.carat,
      'cut': formValue.cut,
      'img': constructedImgPath,
      'material': formValue.material,
      'description': formValue.description,
      'sale': formValue.sale ? formValue.sale : 1,
      'sizes': formValue.sizes
    }
    //console.log(newProductObj);
    this.cartService.saveNewProduct(newProductObj);
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

saveProductChanges(formValue){
  console.log('edit product form value: ');
  console.log(formValue);

  //console.log('edit product form viewChild: ');
  //console.log(this.editProductForm);


  

  
}
  

  ngOnInit() {
    this.fillCollections();
    this.fillStones();
    this.fillCuts();
    this.fillMaterials();
    this.fillSizes();
  }


  



}
