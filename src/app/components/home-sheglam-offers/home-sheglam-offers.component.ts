import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

// Define interface for product objects based on provided data
interface Product {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  handle: string;
  is_giftcard: boolean;
  discountable: boolean;
  thumbnail: string;
  collection_id: string;
  type_id: string | null;
  weight: string;
  length: string | null;
  height: string | null;
  width: string | null;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  created_at: string;
  updated_at: string;
  type: any | null;
  collection: {
    id: string;
    title: string;
    handle: string;
    created_at: string;
    updated_at: string;
    metadata: any | null;
    deleted_at: string | null;
  };
  options: Array<{
    id: string;
    title: string;
    metadata: any | null;
    product_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    values: Array<{
      id: string;
      value: string;
      metadata: any | null;
      option_id: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    }>;
  }>;
  tags: any[];
  images: Array<{
    id: string;
    url: string;
    metadata: any | null;
    rank: number;
    product_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
  variants: Array<{
    id: string;
    title: string;
    sku: string;
    barcode: string | null;
    ean: string | null;
    upc: string | null;
    allow_backorder: boolean;
    manage_inventory: boolean;
    hs_code: string | null;
    origin_country: string | null;
    mid_code: string | null;
    material: string | null;
    weight: string | null;
    length: string | null;
    height: string | null;
    width: string | null;
    metadata: any | null;
    variant_rank: number;
    product_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    options: Array<{
      id: string;
      value: string;
      metadata: any | null;
      option_id: string;
      option: {
        id: string;
        title: string;
        metadata: any | null;
        product_id: string;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
      };
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    }>;
  }>;
}

@Component({
  selector: 'app-home-sheglam-offers',
  templateUrl: './home-sheglam-offers.component.html',
  styleUrls: ['./home-sheglam-offers.component.css'],
})
export class HomeSheglamOffersComponent implements OnInit {
  items: any[] = []; // Initialize as empty Product array

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProducts(); // Fetch products on initialization
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        // Map API response to Product interface
        this.items = res.products || []; // Adjust based on API response structure
        console.log('Fetched products:', this.items);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.items = []; // Fallback to empty array on error
        this.cdr.detectChanges();
      },
    });
  }
}