import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingService } from './../../services/listing.service';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product-service.service';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('productForm', { static:false }) productForm;
  @ViewChild('editProductForm', { static:false }) editProductForm;

  // this is how you access the queried node's values with @ViewChild:
  // this.editProductForm.value.productName
  // This is read-only!

  selectedProductObj = { };

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
    private cartService: CartService,
    private productService: ProductService
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

  fillCollections(){
    this.listingService.fillAllProducts();
    this.collections = this.listingService.getAllCollections();
  }

  fillStones(){
    this.listingService.fillAllProducts();
    this.stones = this.listingService.getAllStones();
  }

  fillCuts(){
    this.listingService.fillAllProducts();
    this.cuts = this.listingService.getAllCuts();
  }

  fillMaterials(){
    this.listingService.fillAllProducts();
    this.materials = this.listingService.getAllMaterials();
  }

  fillSizes(){
    this.sizes = this.listingService.getAllSizes();
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

saveProductChanges(formValueObj){
  
  let thePatchObj = {};
  
  for(let keyS in this.selectedProductObj){
    for(let keyF in formValueObj){
      if(keyF === keyS){
        
        // add member to thePatchObj if the value is a primitive and the value of the selectedObj 
        // and the value of the receivedObj for the same key is different 
        // the value has to be the one coming from the form
        if( typeof formValueObj[keyF] !== 'object' && formValueObj[keyF] !== this.selectedProductObj[keyS] ){
            thePatchObj[keyF] = formValueObj[keyF];

        // if the receivedObj value for a key is an array...    
        } else if( typeof formValueObj[keyF] === 'object' ){

          // compare the 2 arrays's length, if they have same length, do not add 
          // the sizes prop to the patch object because there is nothing to update,
          // else, the value for the sizes key must come from the form
          
          
          let theTwoArraysAreNotEqual = false;

          let arrayCompare = () => {

            let receivedObjectSizeArray = formValueObj['sizes'];
            let selectedObjectSizeArray = this.selectedProductObj['sizes'];

            if(receivedObjectSizeArray.length !== selectedObjectSizeArray.length){
              thePatchObj['sizes'] = receivedObjectSizeArray;
            } else {
              let sortedReceived = [...receivedObjectSizeArray].sort((a,b) => a - b);
              let sortedSelected = [...selectedObjectSizeArray].sort((a,b) => a - b);

              for(let i=0 ; i<sortedSelected.length ; i++){
                sortedSelected[i] === sortedReceived[i] ? null : theTwoArraysAreNotEqual = true ;
              }
            }
          }

          arrayCompare();


          

          theTwoArraysAreNotEqual ? thePatchObj['sizes'] = formValueObj.sizes : null ;

        }
      }
    }
  }

  // remove 'img' and 'gallImages' from patch object if their values are empty
  if(formValueObj['img'] === ""){ delete thePatchObj['img'] }
  if(formValueObj['gallImages'] === ""){ delete thePatchObj['gallImages'] }

  // if thePatchObj is empty, do not call service, because nothing was edited on the form...

    if( Object.keys( thePatchObj ).length === 0 ){
      console.log('service will not be called because nothing was changed on the form');
      return;
    } 

    thePatchObj['id'] = this.selectedProductObj['id'];
    this.productService.updateProduct(thePatchObj);
  

  
}

sendProductToForm(productObj){
  this.selectedProductObj = { ...productObj };
  console.log('the filled up init form object: ');
  console.log(this.selectedProductObj);
}

setDefaultSelectedProductObj(){
  this.selectedProductObj = this.cartService.products[0] ;
  //console.log('the default selected product obj after ngOnInit is: ');
  //console.log(this.selectedProductObj);
}


  

  ngOnInit() {
    this.setDefaultSelectedProductObj();
    

    this.fillCollections();
    this.fillStones();
    this.fillCuts();
    this.fillMaterials();
    this.fillSizes();
  }


  



}
