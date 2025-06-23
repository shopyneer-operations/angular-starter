import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';

// Define interface for category objects
interface Category {
  id: number;
  name: string;
  src: string;
}

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css'],
})
export class HomeCategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;

  categories: Category[] = []; // Initialize as empty array with Category type

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 8 },
    },
  };

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCategories(); // Fetch categories on initialization
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Ensure carousel updates after view initialization
  }

  getCategories(): void {
    this.productService.getCategories().subscribe({
      next: (res: any) => {
        // Map API response to Category interface, set default image if src is null
        this.categories = res.product_categories.map((category: any) => ({
          id: category.id || 0, // Fallback ID if not provided
          name: category.name || 'Unnamed Category', // Fallback name
          src: category.src ?? 'assets/images/Sub_cat.png', // Default image if src is null/undefined
        }));
        console.log('Fetched categories:', this.categories);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        // Fallback to a single error category with default image
        this.categories = [
          {
            id: 0,
            name: 'Error loading categories',
            src: 'assets/images/Sub_cat.png',
          },
        ];
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