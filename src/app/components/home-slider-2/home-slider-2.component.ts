import { Component } from '@angular/core';

@Component({
  selector: 'app-home-slider-2',
  templateUrl: './home-slider-2.component.html',
  styleUrls: ['./home-slider-2.component.css']
})
export class HomeSlider2Component {
  slides = [
    { id: 1, src: 'assets/images/main-slider-1.png', alt: 'Slide 1' },
    { id: 1, src: 'assets/images/home-top-slider.png', alt: 'Slide 1' },
    { id: 1, src: 'assets/images/home-top-slider.png', alt: 'Slide 1' },
  ];
}
