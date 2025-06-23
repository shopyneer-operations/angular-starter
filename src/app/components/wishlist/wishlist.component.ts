import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistProducts: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    this.wishlistProducts = this.wishlistService.getWishlist().map((item: any) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      variants: [{
        calculated_price: {
          calculated_amount: item.price,
          original_amount: item.price,
          currency_code: item.currencyCode
        }
      }],
      ratingCount: item.ratingCount || 0
    }));
  }

  toggleWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId);
    this.loadWishlist();
  }
}