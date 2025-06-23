import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls as { [key: string]: any };
  }

  createCustomer() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const registerData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.authService.register(registerData).subscribe({
      next: (res: any) => {
        console.log('Register response in component:', res);
        this.token = res.token;
        if (!this.token) {
          this.isLoading = false;
          this.errorMessage = 'فشل التسجيل: لم يتم استلام رمز التوثيق.';
          console.error('Token is undefined');
          return;
        }

        const customerData = {
          email: this.registerForm.value.email,
          first_name: this.registerForm.value.first_name,
          last_name: this.registerForm.value.last_name,
          phone: this.registerForm.value.phone
          // Removed password as it may not be required for /store/customers
        };

        console.log('Calling CreateCustomer with:', { token: this.token, customerData });

        this.authService.CreateCustomer(customerData).subscribe({
          next: (res: any) => {
            this.isLoading = false;
            this.successMessage = 'تم إنشاء الحساب بنجاح!';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (err: any) => {
            this.isLoading = false;
            console.error('Customer creation error:', err);
            this.errorMessage = err.error === 'Identity with email already exists'
              ? 'البريد الإلكتروني مستخدم بالفعل. الرجاء استخدام بريد إلكتروني آخر أو تسجيل الدخول.'
              : err.error || 'حدث خطأ أثناء إنشاء العميل. حاول مرة أخرى.';
          }
        });
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Registration error:', err);
        this.errorMessage = err.error === 'Identity with email already exists'
          ? 'البريد الإلكتروني مستخدم بالفعل. الرجاء استخدام بريد إلكتروني آخر أو تسجيل الدخول.'
          : err.error || 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.';
      }
    });
  }
}
