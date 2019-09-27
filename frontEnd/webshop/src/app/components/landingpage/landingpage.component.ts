import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  slidersArray: any[] = [
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
      { src: './../../assets/images/slides/Prestias-1.jpg', txt: 'Prestias Slide 1' },
      { src: './../../assets/images/slides/Prestias-2.jpg', txt: 'Prestias Slide 2' }
    ],
    [
      { src: './../../assets/images/slides/Biafin-1.jpg', txt: 'Biafin Slide 1' },
      { src: './../../assets/images/slides/Biafin-2.jpg', txt: 'Biafin Slide 2' }
    ]
  ];


  constructor() { }



  ngOnInit() { }
  // call a landingpage.service, that fetches info from database about the slides, fills up this.slidersArray,
  // then the landingpage template can display the slides with *ngFor 

}
