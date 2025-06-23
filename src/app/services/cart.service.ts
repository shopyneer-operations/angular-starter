// Define interfaces for type safety
interface DiscountRequest {
  promo_codes: string[];
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from './product.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  private apiUrl = 'https://backend-production-f59a.up.railway.app';
  private apiKey = 'pk_a48bcdbf4f1f8197a35e99cde5374e470989ecd9e34d0b101a0cdbb908c83c3d';

  constructor(private http: HttpClient, private productService: ProductService) {
    this.loadInitialCartCount();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'accept': '*/*',
      'x-publishable-api-key': this.apiKey
    });
  }

  private loadInitialCartCount(): void {
    const cartID = localStorage.getItem('cartID');
    if (cartID) {
      this.productService.getCart(cartID).subscribe({
        next: (res: any) => {
          const items = res.cart?.items || [];
        const count = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
         // const count = items.length;
          this.cartItemCount.next(count);
        },
        error: (err: any) => {
          console.error('Failed to load initial cart count:', err);
          this.cartItemCount.next(0);
        }
      });
    }
  }

  updateCartItemCount(): void {
    const cartID = localStorage.getItem('cartID');
    if (cartID) {
      this.productService.getCart(cartID).subscribe({
        next: (res: any) => {
          const items = res.cart?.items || [];
           const count = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
         // const count = items.length;
          this.cartItemCount.next(count);
        },
        error: (err: any) => {
          console.error('Failed to update cart count:', err);
          this.cartItemCount.next(0);
        }
      });
    } else {
      this.cartItemCount.next(0);
    }
  }

  updateCartItemCountLocally(items: any[]): void {
     const count = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
   // const count = items.length;
    this.cartItemCount.next(count);
  }

  getPaymentOptions(): Observable<any> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('region_id', 'reg_01JVS99K21H4M6E2DN639Q9NXG');
    const url = `${this.apiUrl}/store/payment-providers`;
    return this.http.get(url, { headers, params });
  }


 AddDiscount(cartId: string, promoCode: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/store/carts/${cartId}/promotions`;
    const body: DiscountRequest = {
      promo_codes: [promoCode], // Ensure promo_code is an array
    };
    return this.http.post<any>(url, body, { headers });
  }

 // Create a payment collection
  newpaymentcollection(data: { cart_id: string }): Observable<{ payment_collection: { id: string } }> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/store/payment-collections`;
    return this.http.post<{ payment_collection: { id: string } }>(url, data, { headers });
  }

  // Create a payment session
  createPaymentSession(
    PAYMENT_COLLECTION_ID: string,
    data: { provider_id: string; data: { cartId: string } }
  ): Observable<{ payment_url?: string; [key: string]: any }> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/store/payment-collections/${PAYMENT_COLLECTION_ID}/payment-sessions`;
    return this.http.post<{ payment_url?: string; [key: string]: any }>(url, data, { headers });
  }


}
