import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  CustomerToken:any

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls as { [key: string]: any };
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (response.token) {
          this.authService.setToken(response.token);
          console.log('Token stored in localStorage:', this.authService.getToken());
        } else {
          console.warn('No token received in login response');
        }
        this.isLoading = false;
        this.successMessage = 'تم تسجيل الدخول بنجاح!';
        setTimeout(() => {
          this.router.navigate(['/profile']); // Changed to customer-dashboard for consistency
        }, 2000);
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Login failed:', err);
        this.errorMessage = err.error === 'Identity with email already exists'
          ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
          : err.error || 'حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.';
      }
    });
  }

 signInWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.initiateGoogleSignIn().then(
      (redirectUrl: string) => {
        console.log('Redirecting to Google:', redirectUrl);
        window.location.href = redirectUrl; // Redirect to Google's OAuth page
      },
      (err: any) => {
        this.isLoading = false;
        console.error('Google sign-in initiation failed:', err);
        this.errorMessage = 'حدث خطأ أثناء بدء تسجيل الدخول عبر جوجل. حاول مرة أخرى.';
      }
    );
  }
}