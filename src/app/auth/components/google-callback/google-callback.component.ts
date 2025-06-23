import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-google-callback',
  template: `
    <div class="flex items-center justify-center h-screen">
      <div class="text-center">
        <h2 class="text-2xl font-semibold">جاري معالجة تسجيل الدخول...</h2>
        <p *ngIf="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
      </div>
    </div>
  `,
  styles: []
})
export class GoogleCallbackComponent implements OnInit {
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract query parameters (state, code, scope, etc.)
    const queryParams = this.route.snapshot.queryParams;
    console.log('Google callback query params:', queryParams);

    // Send query parameters to /auth/customer/google/callback
    this.authService.handleGoogleCallback(queryParams).subscribe({
      next: (response: any) => {
        console.log('Google callback token:', response.token);
        // Assume Google provides email, first_name, last_name
        // Phone may need to be collected; for now, use placeholder
        const customerData = {
          email: response.email || 'google-user@example.com', // Replace with actual email from response
          first_name: response.first_name || 'Google', // Replace with actual data
          last_name: response.last_name || 'User',
          phone: response.phone || '1234567890' // Placeholder; collect if needed
        };

        // Create customer
        this.authService.CreateCustomer(customerData).subscribe({
          next: () => {
            // Refresh token
            this.authService.refreshToken().subscribe({
              next: (refreshResponse: any) => {
                console.log('Refreshed token:', refreshResponse.token);
                // Get customer details
                this.authService.getCustomer().subscribe({
                  next: (customerResponse: any) => {
                    console.log('Customer details:', customerResponse);
                    // Redirect to dashboard
                    this.router.navigate(['/customer-dashboard']);
                  },
                  error: (err: any) => {
                    console.error('Get customer failed:', err);
                    this.errorMessage = 'حدث خطأ أثناء استرجاع بيانات العميل. حاول مرة أخرى.';
                  }
                });
              },
              error: (err: any) => {
                console.error('Token refresh failed:', err);
                this.errorMessage = 'حدث خطأ أثناء تحديث رمز التوثيق. حاول مرة أخرى.';
              }
            });
          },
          error: (err: any) => {
            console.error('Create customer failed:', err);
            this.errorMessage = 'حدث خطأ أثناء إنشاء العميل. حاول مرة أخرى.';
          }
        });
      },
      error: (err: any) => {
        console.error('Google callback failed:', err);
        this.errorMessage = 'حدث خطأ أثناء معالجة تسجيل الدخول عبر جوجل. حاول مرة أخرى.';
      }
    });
  }
}