import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  rating?: number;
  ratingCount?: number;
  variants?: {
    id: string;
    calculated_price?: {
      calculated_amount: number;
      original_amount: number;
      currency_code: string;
    };
  }[];
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product!: any;
  isAddingToCart: boolean = false;
  isInWishlist: boolean = false;

  get discountedPrice(): number {
    return this.product.variants?.[0]?.calculated_price?.calculated_amount ?? 0;
  }

  get originalPrice(): number {
    return this.product.variants?.[0]?.calculated_price?.original_amount ?? 0;
  }

  get discount(): number {
    const calculated = this.discountedPrice;
    const original = this.originalPrice;
    return original > calculated ? ((original - calculated) / original) * 100 : 0;
  }

  get currencyCode(): string {
    return this.product.variants?.[0]?.calculated_price?.currency_code?.toUpperCase() ?? 'EGP';
  }

  constructor(
    private router: Router,
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    if (!this.product) {
      console.error('Product input is missing');
      return;
    }
    this.checkWishlistStatus();
    console.log('Product:', this.product);
  }

  private checkWishlistStatus(): void {
    const wishlist = this.wishlistService.getWishlist();
    this.isInWishlist = wishlist.some((item: any) => item.id === this.product.id);
  }

  toggleWishlist(): void {
    const productData = {
      id: this.product.id,
      title: this.product.title,
      thumbnail: this.product.thumbnail,
      price: this.discountedPrice,
      currencyCode: this.currencyCode,
      ratingCount: this.product.ratingCount || 0
    };

    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
      this.isInWishlist = false;
    } else {
      this.wishlistService.addToWishlist(productData);
      this.isInWishlist = true;
    }
  }

  getStars(rating: number | undefined): { filled: boolean }[] {
    const stars = [];
    const maxStars = 5;
    const effectiveRating = rating ?? 0;
    for (let i = 1; i <= maxStars; i++) {
      stars.push({
        filled: i <= Math.floor(effectiveRating) || (i === Math.ceil(effectiveRating) && effectiveRating % 1 >= 0.5)
      });
    }
    return stars;
  }

  navigateToCart(): void {
    if (this.isAddingToCart || !this.product.variants?.length) {
      return;
    }
    this.isAddingToCart = true;
    const cartID = localStorage.getItem('cartID');

    if (cartID) {
      this.addToExistingCart(cartID);
    } else {
      this.createNewCart();
    }
  }

  private addToExistingCart(cartID: string): void {
    const variantId = this.product.variants?.[0]?.id;
    if (!variantId) {
      console.error('No variant available for adding to cart');
      this.isAddingToCart = false;
      return;
    }
    /* this.productService.addToCart(cartID, variantId).subscribe({
      next: (res: any) => {
        console.log('Product added to cart:', res);
        this.isAddingToCart = false;
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        this.isAddingToCart = false;
      }
    }); */
  }

  private createNewCart(): void {
    this.productService.createCart().subscribe({
      next: (res: any) => {
        const newCartID = res.cart?.id;
        if (newCartID) {
          localStorage.setItem('cartID', newCartID);
          this.addToExistingCart(newCartID);
        } else {
          console.error('No cart ID returned');
          this.isAddingToCart = false;
        }
      },
      error: (err) => {
        console.error('Error creating cart:', err);
        this.isAddingToCart = false;
      }
    });
  }
}