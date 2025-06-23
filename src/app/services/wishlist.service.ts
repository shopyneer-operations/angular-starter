import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistCountSubject = new BehaviorSubject<number>(0);
  wishlistItemCount$: Observable<number> = this.wishlistCountSubject.asObservable();

  constructor() {
    this.updateWishlistCount(); // Initialize count on service creation
  }

  // Update wishlist count based on localStorage
  private updateWishlistCount(): void {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.wishlistCountSubject.next(wishlist.length);
  }

  // Add product to wishlist
  addToWishlist(product: any): void {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.some((item: any) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      this.updateWishlistCount();
    }
  }

  // Remove product from wishlist
  removeFromWishlist(productId: string): void {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter((item: any) => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    this.updateWishlistCount();
  }

  // Get wishlist items
  getWishlist(): any[] {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
}