import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  cart: any;
  cartItems: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  subtotal: number = 0;
  shippingTotal: number = 0;
  discountTotal: number = 0;
  total: number = 0;
  discountCode: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cartID = localStorage.getItem('cartID');
    if (cartID) {
      this.isLoading = true;
      this.productService.getCart(cartID).subscribe({
        next: (res: any) => {
          this.cart = res.cart;
          this.cartItems = res.cart.items || [];
          // Use response fields directly
          this.subtotal = res.cart.subtotal || 0;
          this.shippingTotal = res.cart.shipping_total || 0;
          this.discountTotal = res.cart.discount_total || 0;
          this.total = res.cart.total || 0;
          this.cartService.updateCartItemCountLocally(this.cartItems);
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'فشل في تحميل عربة التسوق. حاول مرة أخرى.';
          this.isLoading = false;
          console.error('Error fetching cart:', err);
        }
      });
    } else {
      this.error = 'لا توجد عربة تسوق حالية.';
    }
  }

  increaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity < (item.variant?.inventory_quantity || Infinity)) {
      item.quantity++;
      this.updateCartItem(item);
    } else {
      this.error = 'الكمية المطلوبة غير متوفرة في المخزون.';
    }
  }

  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }

  removeItem(index: number): void {
    const item = this.cartItems[index];
    const cartID = localStorage.getItem('cartID');
    if (cartID && item.id) {
      this.productService.removeCartLine(cartID, item.id).subscribe({
        next: () => {
          this.loadCart(); // Reload cart to update totals
          this.cartService.updateCartItemCountLocally(this.cartItems);
        },
        error: (err) => {
          this.error = 'فشل في حذف المنتج من العربة. حاول مرة أخرى.';
          console.error('Error removing item:', err);
        }
      });
    }
  }

  private updateCartItem(item: any): void {
    const cartID = localStorage.getItem('cartID');
    if (cartID && item.id) {
      this.productService.updateCartLine(cartID, item.id, item.quantity).subscribe({
        next: () => {
          this.loadCart(); // Reload cart to update totals
          this.cartService.updateCartItemCountLocally(this.cartItems);
        },
        error: (err) => {
          this.error = 'فشل في تحديث الكمية. حاول مرة أخرى.';
          console.error('Error updating cart item:', err);
        }
      });
    }
  }

  applyDiscountCode(): void {
    const cartID = localStorage.getItem('cartID');
    if (cartID && this.discountCode) {
      this.cartService.AddDiscount(cartID, this.discountCode).subscribe({
        next: (res: any) => {
          this.loadCart(); // Reload cart to reflect discount
        },
        error: (err) => {
          this.error = 'فشل في تطبيق كود الخصم. حاول مرة أخرى.';
          console.error('Error applying discount:', err);
        }
      });
    } else {
      this.error = 'يرجى إدخال كود خصم صالح.';
      console.log(cartID, this.discountCode);
    }
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  trackByItemId(index: number, item: any): string {
    return item.id;
  }
}