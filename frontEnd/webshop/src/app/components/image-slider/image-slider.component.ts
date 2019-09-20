import { Component, OnInit } from '@angular/core';
//import { Slide } from './../../interfaces/slide';

@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  slides:any[];
  currSlideSRC:string;
  currSlideTXT:string;
  counter:number;

  constructor(slides:any[], currSlideSRC?:string, currSlideTXT?:string, counter:number = 0) { 
    this.slides = slides,
    this.currSlideSRC = currSlideSRC,
    this.currSlideTXT = currSlideTXT,
    this.counter = counter
   }

  turnPage(){
    if(this.counter === this.slides.length-1){
      this.counter = -1;
    }
      this.counter ++;
      //console.log(this.counter);

      this.currSlideSRC = this.slides[`${this.counter}`].src;
      this.currSlideTXT = this.slides[`${this.counter}`].txt;
  }

  ngOnInit() {

  }

}
