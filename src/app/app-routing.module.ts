import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { ReturnExchangePolicyComponent } from './components/return-exchange-policy/return-exchange-policy.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ConfirmPasswordComponent } from './auth/components/confirm-email/confirm-password.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { RenewPasswordComponent } from './auth/components/renew-password/renew-password.component';
import { CartsComponent } from './components/carts/carts.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserMortag3Component } from './components/user-mortag3/user-mortag3.component';
import { UserAddressesComponent } from './components/user-addresses/user-addresses.component';
import { UserGiftsComponent } from './components/user-gifts/user-gifts.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { GoogleCallbackComponent } from './auth/components/google-callback/google-callback.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';
import { ReviewSellerComponent } from './components/review-seller/review-seller.component';
import { ReviewDeliveryComponent } from './components/review-delivery/review-delivery.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ShipingPolicyComponent } from './components/shiping-policy/shiping-policy.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-conditions', component: TermsAndConditionsComponent },
  { path: 'return-policy', component: ReturnExchangePolicyComponent },
  { path: 'shipping-policy', component: ShipingPolicyComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email', component: ConfirmPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'renew-password', component: RenewPasswordComponent },
  { path: 'auth/google/callback', component: GoogleCallbackComponent },
  { path: 'cart', component: CartsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'search', component: SearchComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'brand/:id', component: BrandDetailsComponent },
  { path: 'sub-category/:id', component: CategoryDetailsComponent },
  { path: 'category/:id', component: ProductCategoryComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'confirm-order', component: ConfirmOrderComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'review-product', component: ReviewProductComponent },
  { path: 'review-seller', component: ReviewSellerComponent },
  { path: 'review-delivery', component: ReviewDeliveryComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    children: [
      { path: '', component: UserAccountComponent },
      { path: 'account', component: UserAccountComponent },
      { path: 'favorites', component: UserFavoritesComponent },
      { path: 'orders', component: UserOrdersComponent },
      { path: 'returns', component: UserMortag3Component },
      { path: 'addresses', component: UserAddressesComponent },
      { path: 'gift-cards', component: UserGiftsComponent },
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}