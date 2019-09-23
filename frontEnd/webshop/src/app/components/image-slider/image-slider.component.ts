import { Component, OnInit, Input } from '@angular/core';




@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
  
export class ImageSliderComponent implements OnInit {

  // the parent component will fill up this array (these are defaults only), thats why @Input
  @Input() slides:any[] = [ 
      { src: './../../assets/images/slides/defaultSlide.jpg', txt: 'Slide 1' },
      { src: './../../assets/images/slides/defaultSlide.jpg', txt: 'Slide 2' },
      { src: './../../assets/images/slides/defaultSlide.jpg', txt: 'Slide 3' },
    ];
  currSlideSRC:string = this.slides[0].src;
  currSlideTXT:string = this.slides[0].txt;
  counter:number = 0;
  @Input() interval:number = 2000;

  constructor(){}

  turnPage():void {
    if(this.counter === this.slides.length-1){
      this.counter = -1;
    }
      this.counter ++;
      this.currSlideSRC = this.slides[`${this.counter}`].src;
      this.currSlideTXT = this.slides[`${this.counter}`].txt;
  }

  ngOnInit() {

    setInterval(() => {
      this.turnPage();
    }, this.interval)

  }

}
