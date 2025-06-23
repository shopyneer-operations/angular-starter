import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-name',
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.css'],
})
export class CategoryNameComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;

  categories: any[] = []; // Adjust type based on API response

  // OwlCarousel options
  carouselOptions: OwlOptions = {
    loop: true,
    margin: 5,
    nav: false,
    dots: false,
    rtl: true,
    autoWidth: false,
    stagePadding: 10,
    responsive: {
      0: { items: 3 },
      480: { items: 4 },
      768: { items: 6 },
      1024: { items: 10 },
      1440: { items: 12 },
    },
  };

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef // Add ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCategories(); // Fetch categories on component initialization
  }

  ngAfterViewInit(): void {
    // No refresh method; rely on Angular's change detection
    // Optionally trigger change detection if carousel doesn't update
    this.cdr.detectChanges();
  }

  getCategories(): void {
    this.productService.getCategories().subscribe({
      next: (res: any) => {
        // Map API response to categories array
        this.categories = res.product_categories
        //.map((category: any) =>
        //  typeof category === 'string' ? category : category.name // Adjust based on API response
      //  );
        console.log('Fetched categories:', this.categories);
        // Trigger change detection after data is loaded
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.categories = ['Error loading categories'];
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