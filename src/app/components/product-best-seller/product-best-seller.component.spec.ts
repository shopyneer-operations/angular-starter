import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBestSellerComponent } from './product-best-seller.component';

describe('ProductBestSellerComponent', () => {
  let component: ProductBestSellerComponent;
  let fixture: ComponentFixture<ProductBestSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBestSellerComponent]
    });
    fixture = TestBed.createComponent(ProductBestSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
