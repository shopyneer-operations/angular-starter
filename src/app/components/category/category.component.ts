import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  category_children: Subcategory[];
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  id: string | null = null;
  fetchedProducts: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  private routeSub: Subscription | undefined;

  category: any = {};
  subcategories: Subcategory[] = [];

  @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    rtl: true,
    autoWidth: false,
    stagePadding: 20,
    responsive: {
      0: { items: 2 },
      480: { items: 3 },
      768: { items: 5 },
      1024: { items: 8 },
      1440: { items: 10 }
    }
  };

  minPrice: number = 0;
  maxPrice: number = 1000;
  priceRange: number = 500;
  sortOption: string = 'latest';
  selectedRating: number | null = null;

  staticBrands = [
    { name: 'SHEGLAM', selected: false },
    { name: 'Eva', selected: false },
    { name: 'Shein', selected: false },
    { name: 'Essence', selected: false },
    { name: 'Pretty woman', selected: false }
  ];

  staticAvailability = [
    { name: 'متوفر', count: 70, selected: false },
    { name: 'غير متوفر', count: 25, selected: false }
  ];

  staticColors = [
    { name: 'White', class: 'text-white border border-gray-300', selected: false },
    { name: 'Black', class: 'text-black', selected: false },
    { name: 'Brown', class: 'text-yellow-900', selected: false },
    { name: 'Nude', class: 'text-pink-900', selected: false }
  ];

  staticRatings = [
    { stars: 5 },
    { stars: 4 },
    { stars: 3 },
    { stars: 2 }
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getCategory();
        this.getProductsByCategory();
      } else {
        this.errorMessage = 'Invalid category ID';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCategory(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.productService.getCategoryById(this.id!).subscribe({
      next: (res: any) => {
        this.category = res.product_category ;
        this.subcategories = res.product_category?.category_children || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching category:', err);
        this.errorMessage = 'Failed to load category. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getProductsByCategory(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.productService.getProductsByCategoryId(this.id!).subscribe({
      next: (res: any) => {
        this.fetchedProducts = res.products || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(`Error fetching products for category ${this.id}:`, err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
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