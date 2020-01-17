import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { ListingService } from './../../services/listing.service'
import { CartService } from './../../services/cart.service'
import { ProductService } from './../../services/product-service.service'
import { Subscription } from 'rxjs'


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  @ViewChild('productForm', { static:false }) productForm;
  @ViewChild('editProductForm', { static:false }) editProductForm;

  productsSub = new Subscription()
  products = []
  selectedProductObj = { }
  addProductBtnClicked = false
  editProductBtnClicked = false
  manageOrdersBtnClicked = false
  manageUsersBtnClicked = false
  collectionSwitched = false
  stoneSwitched = false
  cutSwitched = false
  materialSwitched = false
  collections = []
  stones = []
  cuts = []
  materials = []
  sizes = []
  selectedImageObj:File = null
  

  constructor(
    private listingService: ListingService,
    private cartService: CartService,
    private productService: ProductService
  ) { }

  onSingleImageSelected(event){
    this.selectedImageObj = event.target.files[0];
    //console.log(this.selectedImageObj);
    //console.log(typeof this.selectedImageObj);
  }

  onDeleteProduct(id:number){
    console.log('this is the id received by onDeleteProduct(): ', id);
    this.products = this.products.filter(e => e.id !== id);
    this.productService.deleteProduct(id);
  }

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

  

  productFormSubmit(formValue){
    // sanitize data received from form, before passing it to service
    let theCollection = formValue.collection.toLowerCase();
    
    let newProductObj = new FormData(); 
    newProductObj.append('collection', theCollection);
    newProductObj.append('productName', formValue.productName);
    newProductObj.append('price', formValue.price);
    newProductObj.append('stone', formValue.stone);
    newProductObj.append('carat', formValue.carat);
    newProductObj.append('cut', formValue.cut);
    newProductObj.append('material', formValue.material);
    newProductObj.append('description', formValue.description);
    newProductObj.append('sale', formValue.sale ? formValue.sale : 1);
    newProductObj.append('sizes', formValue.sizes);
    newProductObj.append('mainImageObj', this.selectedImageObj);
    
    //console.log('newProductObj is: ', newProductObj);
    this.productService.addNewProductToDB(newProductObj)
    this.productService.getProductsUpdatedListener()
    .subscribe(
      products => this.products = [...products],
      error => console.log(error)
    )
    
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
      //console.log('service will not be called because nothing was changed on the form');
      return;
    } 

    thePatchObj['id'] = this.selectedProductObj['id'];
    this.productService.updateProduct(thePatchObj);
  
}

sendProductToForm(productObj){
  this.selectedProductObj = { ...productObj };
  //console.log('the filled up init form object: ');
  //console.log(this.selectedProductObj);
}

setDefaultSelectedProductObj(){
  this.selectedProductObj = this.products[0] ;
  //console.log('the default selected product obj after ngOnInit is: ');
  //console.log(this.selectedProductObj);
}

getProductsFromProductService(){
  this.productsSub = this.productService.getProductsUpdatedListener()
  .subscribe(
    products => {
      this.products = [...products]
      //console.log('admin.component this.products: ', this.products)

      //populate dropdowns...
      this.products.forEach(p => {
        !this.collections.includes(p.collection) ? this.collections.push(p.collection) : null
        !this.stones.includes(p.stone) ? this.stones.push(p.stone) : null
        !this.cuts.includes(p.cut) ? this.cuts.push(p.cut) : null
        !this.materials.includes(p.material) ? this.materials.push(p.material) : null
        !this.sizes.includes(p.size) ? this.sizes.push(p.size) : null
      })
    },
    error => console.log(error)
  )
}
  
  ngOnInit() {
    this.getProductsFromProductService()
    this.setDefaultSelectedProductObj()
  }

  ngOnDestroy(){
    this.productsSub.unsubscribe()
  }

}
