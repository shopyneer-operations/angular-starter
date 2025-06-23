import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { MatCardModule }  from '@angular/material/card'
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryNameComponent } from './components/category-name/category-name.component';
import { ProductSuggestionComponent } from './components/product-suggestion/product-suggestion.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { HomeTextOfferComponent } from './components/home-text-offer/home-text-offer.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { HomeOffersComponent } from './components/home-offers/home-offers.component';
import { HomeNewProductsComponent } from './components/home-new-products/home-new-products.component';
import { HomeSlider2Component } from './components/home-slider-2/home-slider-2.component';
import { HomeSaleComponent } from './components/home-sale/home-sale.component';
import { HomeDiscountCopounComponent } from './components/home-discount-copoun/home-discount-copoun.component';
import { HomeBrandsComponent } from './components/home-brands/home-brands.component';
import { HomeSheglamOffersComponent } from './components/home-sheglam-offers/home-sheglam-offers.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartsComponent } from './components/carts/carts.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { ReturnExchangePolicyComponent } from './components/return-exchange-policy/return-exchange-policy.component';
import { ShipingPolicyComponent } from './components/shiping-policy/shiping-policy.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './components/product/product.component';
import { FollowOrderComponent } from './components/follow-order/follow-order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserMortag3Component } from './components/user-mortag3/user-mortag3.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GiftsComponent } from './components/gifts/gifts.component';
import { SaleByCategoryComponent } from './components/sale-by-category/sale-by-category.component';
import { UserAddressesComponent } from './components/user-addresses/user-addresses.component';
import { UserGiftsComponent } from './components/user-gifts/user-gifts.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';
import { GiftDetailsComponent } from './components/gift-details/gift-details.component';
import { HomeCardOffersComponent } from './components/home-card-offers/home-card-offers.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductBestSellerComponent } from './components/product-best-seller/product-best-seller.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ReviewSellerComponent } from './components/review-seller/review-seller.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';
import { ReviewDeliveryComponent } from './components/review-delivery/review-delivery.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryComponent } from './components/category/category.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CategoryNameComponent,
    ProductSuggestionComponent,
    HomeSliderComponent,
    HomeTextOfferComponent,
    HomeCategoriesComponent,
    HomeOffersComponent,
    HomeNewProductsComponent,
    HomeSlider2Component,
    HomeSaleComponent,
    HomeDiscountCopounComponent,
    HomeBrandsComponent,
    HomeSheglamOffersComponent,
    CategoryComponent,
    ProductDetailsComponent,
    CartsComponent,
    CheckOutComponent,
    ConfirmOrderComponent,
    AboutComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    ReturnExchangePolicyComponent,
    ShipingPolicyComponent,
    WishlistComponent,
    SearchComponent,
    ProductComponent,
    FollowOrderComponent,
    NotFoundComponent,
    UserProfileComponent,
    UserAccountComponent,
    UserOrdersComponent,
    UserMortag3Component,
    GiftsComponent,
    SaleByCategoryComponent,
    UserAddressesComponent,
    UserGiftsComponent,
    UserFavoritesComponent,
    GiftDetailsComponent,
    HomeCardOffersComponent,
    ProductCategoryComponent,
    ProductBestSellerComponent,
    OrderDetailsComponent,
    ReviewSellerComponent,
    ReviewProductComponent,
    ReviewDeliveryComponent,
    BrandDetailsComponent,
    CategoryDetailsComponent,
    CategoryComponent
 



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatCardModule,
    ToastrModule.forRoot(), 
    // ToastrModule added
    AuthModule,
    CarouselModule,
    ReactiveFormsModule,
    
    AuthModule,
 

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]

})
export class AppModule { 

}
