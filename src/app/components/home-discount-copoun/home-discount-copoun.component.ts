import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';

interface Promotion {
  code: string;
  application_method: { value: string };
  // Add other properties as needed
}

@Component({
  selector: 'app-home-discount-copoun',
  templateUrl: './home-discount-copoun.component.html',
  styleUrls: ['./home-discount-copoun.component.css']
})
export class HomeDiscountCopounComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;

  Promotions: any[] = [];

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 15,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    rtl: true, // Enable RTL for Arabic
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 }
    }
  };

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions() {
    this.productservice.promotions().subscribe((res: any) => {
      console.log('API Response:', res);

      if (res?.promotions) {
        this.Promotions = res.promotions.map((promotion: any) => ({
          ...promotion,
          application_method: promotion.application_method || { value: 'غير متوفر' }
        }));
        console.log('Processed Promotions:', this.Promotions);
        if (this.Promotions.length <= 4) {
          console.log('Fewer than 5 promotions, carousel will be hidden.');
        }
      } else {
        console.warn('No promotions found in API response.');
      }
    });
  }

  prevSlide() {
    this.carousel?.prev();
  }

  nextSlide() {
    this.carousel?.next();
  }
}