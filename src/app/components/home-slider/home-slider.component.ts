import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit, AfterViewInit {
  slides = [
    { id: 1, src: 'assets/images/home-top-slider.png', alt: 'Slide 1' },
    { id: 2, src: 'assets/images/home-top-slider.png', alt: 'Slide 2' },
    { id: 3, src: 'assets/images/home-top-slider.png', alt: 'Slide 3' },
  ];

  constructor(private elRef: ElementRef, private router: Router) {}

  ngOnInit(): void {
    // Listen for route changes and reinitialize the carousel
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/') {
        this.reinitializeCarousel();
      }
    });
  }

  ngAfterViewInit(): void {
    this.reinitializeCarousel(); // Initial load
  }

  reinitializeCarousel(): void {
    setTimeout(() => {
      import('flowbite').then(flowbite => {
        flowbite.initCarousels(); // Reinitialize Flowbite's carousel
      });
    }, 100); // Small delay to ensure DOM is ready
  }
}
