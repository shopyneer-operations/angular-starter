import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSellerComponent } from './review-seller.component';

describe('ReviewSellerComponent', () => {
  let component: ReviewSellerComponent;
  let fixture: ComponentFixture<ReviewSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewSellerComponent]
    });
    fixture = TestBed.createComponent(ReviewSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
