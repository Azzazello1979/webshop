import { Component, OnInit } from '@angular/core';


//import { Slide } from './../../interfaces/slide';

@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
  
export class ImageSliderComponent implements OnInit {

  slides:any[] = [
      { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-1.jpg', txt: 'Slide 1' },
      { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-2.jpg', txt: 'Slide 2' },
      { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-3.jpg', txt: 'Slide 3' },
    ];
  currSlideSRC:string;
  currSlideTXT:string;
  counter:number;
  show:boolean;

  constructor(){}

  turnPage():void {
    if(this.counter === this.slides.length-1){
      this.counter = -1;
    }
      this.counter ++;
      this.show = !this.show;
      this.currSlideSRC = this.slides[`${this.counter}`].src;
      this.currSlideTXT = this.slides[`${this.counter}`].txt;
  }

  ngOnInit() {
    this.currSlideSRC = this.slides[0].src;
    this.currSlideTXT = this.slides[0].txt;
    this.counter = 0;
    this.show = false;

    setInterval(() => {
      this.turnPage();
    },2000)

  }

}
