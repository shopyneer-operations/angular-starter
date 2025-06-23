import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

interface Product {
  id: string;
  name: string;
  image: string;
  description?: string;
  price?: number;
}

interface Brand {
  id: string;
  name: string;
  image: string;
  products?: Product[];
}

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  brand: Brand = { id: '', name: '', image: '' };
  brands: Brand[] = [];
  brandProducts: any[] = [];
  fetchedProducts: any[] = []; // Store products fetched by getProductById
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
        this.getBrand();
      }
      this.getAllBrands();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getBrand(): void {
    this.productService.getBrand(this.id!).subscribe({
      next: (res: any) => {
        this.brand = res.brand;
        this.brandProducts = res.brand.products || [];
        // Fetch details for each product by ID
        this.fetchedProducts = []; // Clear previous products
        this.brandProducts.forEach(product => {
          this.getProductById(product.id);
        });
      },
      error: (err) => console.error('Error fetching brand:', err)
    });
  }

  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        const product = res.product; // Adjust based on API response
        if (product) {
          this.fetchedProducts.push(product);
          console.log('Fetched Product:', product);
        }
      },
      error: (err) => console.error(`Error fetching product ${id}:`, err)
    });
  }

  getAllBrands(): void {
    this.productService.getAllBrands().subscribe({
      next: (res: any) => {
        this.brands = res.brands || [];
        console.log('All Brands:', this.brands);
      },
      error: (err) => console.error('Error fetching brands:', err)
    });
  }
}