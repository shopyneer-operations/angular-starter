
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl = 'https://backend-production-f59a.up.railway.app';
  private apiKey = 'pk_a48bcdbf4f1f8197a35e99cde5374e470989ecd9e34d0b101a0cdbb908c83c3d';

  constructor(private http: HttpClient) {}

  // Helper method to create headers with the token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'accept': '*/*',
      'x-publishable-api-key': this.apiKey
    });
  }

  // Fetch all products
  getProducts(): Observable<any> {
    const headers = this.getHeaders();
    const params = new HttpParams().set(
      'fields',
      '*brand,*variants.calculated_price,+variants.inventory_quantity,*supplier,*categories,*collection,*reviews,*reviews.customer,*sales'
    );
    return this.http.get(`${this.apiUrl}/store/products`, { headers, params });
  }

  // Get products together
  GetProductsTogether(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/store/together/${id}`, { headers });
  }

  // Get product by ID
  getProductById(id: any): Observable<any> {
    const headers = this.getHeaders();
    const params = new HttpParams().set(
      'fields',
      '*brand,*variants.calculated_price,+variants.inventory_quantity,*supplier,*categories,*collection,*reviews,*reviews.customer,*sales'
    );
    return this.http.get(`${this.apiUrl}/store/products/${id}`, { headers, params });
  }
getProductsByCategoryId( category_id: any): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams()
      .set(
        'fields',
        '*brand,*variants.calculated_price,+variants.inventory_quantity,*supplier,*categories,*collection,*reviews,*reviews.customer,*sales'
      )
      .set('category_id', category_id); // Add category_id to query parameters

    return this.http.get(`${this.apiUrl}/store/products`, { headers, params });
  }

  // Get categories of products
  getCategories(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/store/product-categories`, { headers });
  }
    // Get categories of products
  getCategoryById(id:any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/store/product-categories/${id}`, { headers });
  }

  // Get free shipping threshold
  Freeshippingthreshold(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/store/free-shipping-threshold`, { headers });
  }

  // Get cart by ID
  getCart(cartID: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/store/carts/${cartID}`, { headers });
  }

  // Create a new cart
  createCart(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/store/carts`, {}, { headers });
  }

  // Add line item to cart
  addLineToCart(cartID: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/store/carts/${cartID}/line-items`, data , { headers });
  }

  // Update line item quantity in cart
  updateCartLine(cartID: string, lineID: string, quantity: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/store/carts/${cartID}/line-items/${lineID}`, {quantity}, { headers });
  }

  // Remove line item from cart
  removeCartLine(cartID: string, lineID: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/store/carts/${cartID}/line-items/${lineID}`, { headers });
  }
  updateCart(CART_ID: any,data:any):Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/store/carts/${CART_ID}`, data, { headers });
  }
  // Get promotions
  promotions(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/store/promotions`, { headers });
  }

  // Get all brands
  getAllBrands(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/store/brands`, { headers });
  }

  // Get brand by ID
  getBrand(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/store/brands/${id}`, { headers });
  }

  // Apply discount code to cart
  applyDiscountCode(cartID: string, code: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/store/carts/${cartID}/promotions`, { data: { code } }, { headers });
  }
}
