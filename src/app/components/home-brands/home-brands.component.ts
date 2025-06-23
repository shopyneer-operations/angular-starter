import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-brands',
  templateUrl: './home-brands.component.html',
  styleUrls: ['./home-brands.component.css']
})
export class HomeBrandsComponent implements OnInit, AfterViewInit {

  brands: any = []; // ✅ Ensure it’s initialized

  @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;

  constructor(private productservice: ProductService) {}

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 6 }
    }
  };

  ngOnInit(): void {
    this.getBrands();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.carousel) {
        console.error('Carousel is not initialized yet.');
      }
    }, 100);
  }

  prevSlide(): void {
    if (this.carousel && this.brands.length > 1) {
      this.carousel.prev();
    }
  }

  nextSlide(): void {
    if (this.carousel && this.brands.length > 1) {
      this.carousel.next();
    }
  }

  getBrands(): void {
    this.productservice.getAllBrands().subscribe({
      next: (res: any) => {
        let originalBrands = res?.brands || [];
  
        // Repeat the brands to ensure at least 6 items
        while (originalBrands.length < 6) {
          originalBrands = [...originalBrands, ...originalBrands].slice(0, 6);
        }
  
        this.brands = originalBrands;
        console.log('Brands:', this.brands);
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }
  
}
