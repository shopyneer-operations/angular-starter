import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/Services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userEmail: string | null = null;
  cartItemCount: number = 0;
  wishlistItemCount: number = 0;
  private authSubscription: Subscription | undefined;
  private cartSubscription: Subscription | undefined;
  private wishlistSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state
    this.authSubscription = this.authService.getAuthState().subscribe((isAuthenticated: any) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.authService.getCustomer().subscribe({
          next: (response: any) => {
            this.userEmail = response.customer?.email || 'المستخدم';
            console.log('User data:', response);
          },
          error: (err: any) => {
            console.error('Failed to fetch user data:', err);
            this.userEmail = 'المستخدم';
          }
        });
      } else {
        this.userEmail = null;
      }
    });

    // Subscribe to cart item count
    this.cartSubscription = this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    // Subscribe to wishlist item count
    this.wishlistSubscription = this.wishlistService.wishlistItemCount$.subscribe(count => {
      this.wishlistItemCount = count;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}