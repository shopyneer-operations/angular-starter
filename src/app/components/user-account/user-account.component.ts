import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  isAuthenticated: boolean = false;
  userEmail: string | null = 'المستخدم';
  authSubscription: Subscription | undefined;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: [''],
      phone: ['', [Validators.pattern(/^\d{10,}$/)]]
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthState().subscribe((isAuthenticated: any) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.isLoading = true;
        this.authService.getCustomer().subscribe({
          next: (response: any) => {
            this.userEmail = response.customer?.email || 'المستخدم';
            this.profileForm.patchValue({
              first_name: response.customer?.first_name || '',
              last_name: response.customer?.last_name || '',
              dateOfBirth: response.customer?.metadata?.birthday || '',
              phone: response.customer?.phone || ''
            });
            this.isLoading = false;
            console.log('User data:', response);
          },
          error: (err: any) => {
            console.error('Failed to fetch user data:', err);
            this.userEmail = 'المستخدم';
            this.isLoading = false;
          }
        });
      } else {
        this.userEmail = null;
        this.profileForm.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const formData = {
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
        metadata: {
          birthday: this.profileForm.value.dateOfBirth
        },
        phone: this.profileForm.value.phone
      };
      this.authService.updateCustomer(formData).subscribe({
        next: (response: any) => {
          console.log('Profile updated successfully:', response);
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Failed to update profile:', err);
          this.isLoading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  get f() {
    return this.profileForm.controls;
  }
}