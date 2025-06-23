import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://backend-production-f59a.up.railway.app';
  private apiKey = ' pk_a48bcdbf4f1f8197a35e99cde5374e470989ecd9e34d0b101a0cdbb908c83c3d'; // Replace with your actual x-publishable-api-key
  private tokenKey = 'auth_token';
  private authState = new BehaviorSubject<boolean>(!!this.getToken());

  constructor(private http: HttpClient) {}

  // Observable to subscribe to auth state changes
  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/auth/customer/emailpass`, { email, password }, { headers }).pipe(
      map((response: any) => {
        console.log('Login API response:', response);
        if (response.error) {
          throw new Error(response.error);
        }
        if (!response.token) {
          throw new Error('No token received from login API');
        }
        this.setToken(response.token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  initiateGoogleSignIn(): Promise<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/auth/customer/google`, {}, { headers }).pipe(
      map((response: any) => {
        console.log('Google sign-in init response:', response);
        if (!response.location) {
          throw new Error('No redirect URL received from Google sign-in API');
        }
        return response.location;
      }),
      catchError(this.handleError)
    ).toPromise();
  }

  handleGoogleCallback(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('Google callback request:', { url: `${this.baseUrl}/auth/customer/google/callback`, headers, body: params });
    return this.http.post(`${this.baseUrl}/auth/customer/google/callback`, params, { headers }).pipe(
      map((response: any) => {
        console.log('Google callback response:', response);
        if (!response.token) {
          throw new Error('No token received from Google callback API');
        }
        this.setToken(response.token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  CreateCustomer(customerData: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for CreateCustomer'));
    }
    const headers = new HttpHeaders({
      'x-publishable-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log('CreateCustomer request:', { url: `${this.baseUrl}/store/customers`, headers, body: customerData });
    return this.http.post(`${this.baseUrl}/store/customers`, customerData, { headers }).pipe(
      map((response: any) => {
        console.log('CreateCustomer API response:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  refreshToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for token refresh'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/auth/token/refresh`, {}, { headers }).pipe(
      map((response: any) => {
        console.log('Token refresh response:', response);
        if (!response.token) {
          throw new Error('No token received from refresh API');
        }
        this.setToken(response.token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getCustomer(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for getCustomer'));
    }
    const headers = new HttpHeaders({
      'x-publishable-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/store/customers/me`, { headers }).pipe(
      map((response: any) => {
        console.log('Get customer response:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateCustomer(formdata:any): Observable<any>{
  const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for getCustomer'));
    }
    const headers = new HttpHeaders({
      'x-publishable-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/store/customers/me`, formdata,{ headers }).pipe(
      map((response: any) => {
        console.log('Get customer response:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getWishlistOfCustomer(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for getCustomer'));
    }
    const headers = new HttpHeaders({
      'x-publishable-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/store/customers/me/wishlists`, { headers }).pipe(
      map((response: any) => {
        console.log('Get customer Wishlist:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getOrdersOfCustomer(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for getCustomer'));
    }
    const headers = new HttpHeaders({
      'x-publishable-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/store/orders`, { headers }).pipe(
      map((response: any) => {
        console.log('Get customer orders:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }
    getOrderOfCustomerById(id:any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for getCustomer'));
    }
    const headers = new HttpHeaders({
      'x-publishable-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/store/orders/${id}`, { headers }).pipe(
      map((response: any) => {
        console.log('Get customer order:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }
  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/auth/customer/emailpass/register`, user, { headers }).pipe(
      map((response: any) => {
        console.log('Register API response:', response);
        if (!response.token) {
          throw new Error('No token received from register API');
        }
        this.setToken(response.token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authState.next(true); // Notify auth state change
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false); // Notify auth state change
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    const errorMessage = error.error?.message || error.error?.error || error.message || 'حدث خطأ غير متوقع. حاول مرة أخرى.';
    if (error.status === 401) {
      return throwError(() => ({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة', status: error.status }));
    }
    return throwError(() => ({ error: errorMessage, status: error.status }));
  }
}