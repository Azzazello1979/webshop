import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';

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

  constructor(
    private adminService: AdminService
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

  ngOnInit() {
  }

}
