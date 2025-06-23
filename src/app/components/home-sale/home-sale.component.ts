import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';

// Define interface for product objects
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  // Add other fields as needed based on app-product component
}

@Component({
  selector: 'app-home-sale',
  templateUrl: './home-sale.component.html',
  styleUrls: ['./home-sale.component.css'],
})
export class HomeSaleComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;

  items_caresoul: any[] = []; // Typed as Product array

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 5 },
    },
  };

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProducts(); // Fetch products on initialization
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Ensure carousel updates after view initialization
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        // Map API response to Product interface
        this.items_caresoul = res.products || []; // Adjust based on API response structure
        console.log('Fetched products:', this.items_caresoul);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.items_caresoul = []; // Fallback to empty array on error
        this.cdr.detectChanges();
      },
    });
  }

  prevSlide(): void {
    if (this.carousel) {
      this.carousel.prev();
    }
  }

  nextSlide(): void {
    if (this.carousel) {
      this.carousel.next();
    }
  }
}