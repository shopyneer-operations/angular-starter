import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-offers',
  templateUrl: './home-offers.component.html',
  styleUrls: ['./home-offers.component.css']
})
export class HomeOffersComponent implements OnInit {
items: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.items = res.products;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again.';
        this.isLoading = false;
        console.error('Error fetching products:', err);
      }
    });
  }
  
}
