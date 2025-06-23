import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  category: any = {};
  fetchedProducts: any[] = [];
  isLoading: boolean = false; // Track loading state
  private routeSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id !== null) {
        this.getCategory();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getCategory(): void {
    this.isLoading = true; // Start loading
    this.productService.getCategoryById(this.id!).subscribe({
      next: (res: any) => {
        this.category = res.product_category;
        this.fetchedProducts = [];
        if (this.category.category_children && this.category.category_children.length > 0) {
          console.log('Subcategories:', this.category.category_children);
          this.isLoading = false; // Stop loading if subcategories exist
        } else {
          this.getProductsByCategory();
        }
      },
      error: (err) => {
        console.error('Error fetching category:', err);
        this.isLoading = false; // Stop loading on error
      }
    });
  }

  getProductsByCategory(): void {
    this.isLoading = true; // Start loading
    this.productService.getProductsByCategoryId(this.id!).subscribe({
      next: (res: any) => {
        this.fetchedProducts = res.products || [];
        console.log('Fetched Products:', this.fetchedProducts);
        this.isLoading = false; // Stop loading
      },
      error: (err) => {
        console.error(`Error fetching products for category ${this.id}:`, err);
        this.isLoading = false; // Stop loading on error
      }
    });
  }

  selectSubcategory(subcategoryId: string): void {
    this.router.navigate(['/category', subcategoryId]);
  }
}