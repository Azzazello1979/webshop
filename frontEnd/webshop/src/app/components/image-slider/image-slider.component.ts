import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  slides:any = [
    { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-1.jpg', txt: 'Slide 1' },
    { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-2.jpg', txt: 'Slide 2' },
    { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-3.jpg', txt: 'Slide 3' },
  ];

  currSlideSRC:string = 'http://www.naughtypixiemedia.com/slider/Sultavia-1.jpg';
  currSlideTXT:string = 'Slide 1';
  counter:number = 0;

  constructor() { }

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
