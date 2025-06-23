import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-text-offer',
  templateUrl: './home-text-offer.component.html',
  styleUrls: ['./home-text-offer.component.css']
})
export class HomeTextOfferComponent implements OnInit {
  priceforfreeshiping: number | null = 1000; // Default to 1000

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productservice.Freeshippingthreshold().subscribe({
      next: (res: any) => {
        // Set priceforfreeshiping to res.threshold if it exists, otherwise use 1000
        this.priceforfreeshiping = res.threshold ?? 1000;
      },
      error: (err) => {
        console.error('Error fetching free shipping threshold:', err);
        // Fallback to 1000 on error
        this.priceforfreeshiping = 1000;
      }
    });
  }
}