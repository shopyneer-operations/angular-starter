import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

interface PaymentProvider {
  id: string;
  is_enabled: boolean;
}

interface CustomerForm {
  first_name: FormControl<string | null>;
  last_name: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  address: FormControl<string | null>;
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  payment_providers: PaymentProvider[] = [];
  selectedPaymentProvider: string | null = null;
  isProcessingPayment: boolean = false;
  errorMessage: string | null = null;
  customerForm: FormGroup<CustomerForm>;
  isSubmittingForm: boolean = false;

  constructor(
    private cartservice: CartService,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group<CustomerForm>({
      first_name: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      last_name: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      phone: this.fb.control('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      address: this.fb.control('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit(): void {
    this.getPaymentOptions();
  }

  getPaymentOptions() {
    this.cartservice.getPaymentOptions().subscribe({
      next: (res: any) => {
        this.payment_providers = res.payment_providers;
        if (this.payment_providers.length > 0) {
          this.selectedPaymentProvider = this.payment_providers.find(p => p.is_enabled)?.id || null;
        }
      },
      error: (err) => {
        console.error('Error fetching payment options:', err);
        this.errorMessage = 'حدث خطأ أثناء جلب خيارات الدفع. حاول مرة أخرى.';
      }
    });
  }

  getProviderLabel(providerId: string): string {
    switch (providerId) {
      case 'pp_system_default':
        return 'الدفع نقدا عند الاستلام';
      case 'pp_fawaterak_json':
        return 'بطاقة الائتمان (Fawaterak)';
      default:
        return providerId;
    }
  }

  getProviderIcon(providerId: string): string {
    switch (providerId) {
      case 'pp_system_default':
        return 'assets/images/money.png';
      case 'pp_fawaterak_json':
        return 'assets/images/p-1.png';
      default:
        return 'assets/images/default.png';
    }
  }

  getProviderDescription(providerId: string): string {
    switch (providerId) {
      case 'pp_system_default':
        return 'قد يتم فرض رسوم إضافية';
      case 'pp_fawaterak_json':
        return 'ادفع بأمان باستخدام بطاقتك الائتمانية';
      default:
        return '';
    }
  }

  selectPaymentProvider(providerId: string) {
    this.selectedPaymentProvider = providerId;
    this.errorMessage = null;
  }

  updateCart(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.customerForm.invalid) {
        this.errorMessage = 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.';
        this.customerForm.markAllAsTouched();
        reject('Form invalid');
        return;
      }

      const cartID = localStorage.getItem('cartID');
      if (!cartID) {
        this.errorMessage = 'لا يمكن العثور على معرف العربة. حاول مرة أخرى.';
        reject('No cart ID');
        return;
      }

      const formData = this.customerForm.value;
      const cartData = {
        shipping_address: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          address_1: formData.address,
          phone: formData.phone,
          country_code: 'eg'
        },
        email: formData.email
      };

      this.isSubmittingForm = true;
      this.errorMessage = null;

      this.productService.updateCart(cartID, cartData).subscribe({
        next: (res: any) => {
          this.isSubmittingForm = false;
          resolve();
        },
        error: (err) => {
          console.error('Error updating cart:', err);
          this.isSubmittingForm = false;
          this.errorMessage = 'فشل في تحديث بيانات العربة. حاول مرة أخرى.';
          reject(err);
        }
      });
    });
  }

  async createPayment() {
    if (!this.selectedPaymentProvider) {
      this.errorMessage = 'يرجى اختيار طريقة دفع.';
      return;
    }

    try {
      await this.updateCart();

      const cartID = localStorage.getItem('cartID');
      if (!cartID) {
        this.errorMessage = 'لا يمكن العثور على معرف العربة. حاول مرة أخرى.';
        return;
      }

      this.isProcessingPayment = true;
      this.errorMessage = null;
      const data = {
        cart_id: cartID
      };

      this.cartservice.newpaymentcollection(data).subscribe({
        next: (res: any) => {
          this.PaymentSession(res.payment_collection.id, this.selectedPaymentProvider!, cartID);
        },
        error: (err) => {
          console.error('Error creating payment collection:', err);
          this.isProcessingPayment = false;
          this.errorMessage = 'حدث خطأ أثناء إنشاء عملية الدفع. حاول مرة أخرى.';
        }
      });
    } catch (err) {
      this.isProcessingPayment = false;
    }
  }

  PaymentSession(PAYMENT_COLLECTION_ID: string, provider_id: string, cartID: string) {
    const paymentData = {
      provider_id: provider_id,
      data: {
        cartId: cartID
      }
    };

    this.cartservice.createPaymentSession(PAYMENT_COLLECTION_ID, paymentData).subscribe({
      next: (res: any) => {
        console.log('Payment session created:', res);
        this.isProcessingPayment = false;
        if (provider_id === 'pp_fawaterak_json' && res.payment_collection?.payment_sessions[0]?.data?.checkoutUrl) {
          window.location.href = res.payment_collection.payment_sessions[0].data.checkoutUrl; // Redirect to Fawaterak checkout URL
        } else if (provider_id === 'pp_system_default') {
          this.router.navigate(['/confirm-order']);
        } else {
          this.errorMessage = 'لا يوجد رابط دفع متاح لهذا المزود.';
        }
      },
      error: (err) => {
        console.error('Error creating payment session:', err);
        this.isProcessingPayment = false;
        this.errorMessage = 'حدث خطأ أثناء إنشاء جلسة الدفع. حاول مرة أخرى.';
      }
    });
  }

  get f(): CustomerForm {
    return this.customerForm.controls;
  }
}