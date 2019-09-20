import { ImageSliderComponent } from './../image-slider/image-slider.component';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  sultaviaSlider: ImageSliderComponent = new ImageSliderComponent(
    [
      { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-1.jpg', txt: 'Slide 1' },
      { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-2.jpg', txt: 'Slide 2' },
      { src: 'http://www.naughtypixiemedia.com/slider/Sultavia-3.jpg', txt: 'Slide 3' },
    ]
  );





  constructor() { }



  ngOnInit() {



  }

}
