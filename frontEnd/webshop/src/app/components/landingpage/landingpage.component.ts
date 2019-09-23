import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  slidersArray:any[] = [
    [
      { src: './../../assets/images/slides/Sultavia-1.jpg', txt: 'Sultavia Slide 1' },
      { src: './../../assets/images/slides/Sultavia-2.jpg', txt: 'Sultavia Slide 2' },
      { src: './../../assets/images/slides/Sultavia-3.jpg', txt: 'Sultavia Slide 3' },
    ],
    [
      { src: './../../assets/images/slides/Rittis-1.jpg', txt: 'Rittis Slide 1' },
      { src: './../../assets/images/slides/Rittis-2.jpg', txt: 'Rittis Slide 2' },
      { src: './../../assets/images/slides/Rittis-3.jpg', txt: 'Rittis Slide 3' },
      { src: './../../assets/images/slides/Rittis-4.jpg', txt: 'Rittis Slide 4' }
    ],
        [
      { src: './../../assets/images/slides/Regale-1.jpg', txt: 'Regale Slide 1' },
      { src: './../../assets/images/slides/Regale-2.jpg', txt: 'Regale Slide 2' }
    ]
  ]; 
  

  constructor() { }



  ngOnInit() {}


}
