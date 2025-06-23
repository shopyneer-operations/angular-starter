import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDeliveryComponent } from './review-delivery.component';

describe('ReviewDeliveryComponent', () => {
  let component: ReviewDeliveryComponent;
  let fixture: ComponentFixture<ReviewDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewDeliveryComponent]
    });
    fixture = TestBed.createComponent(ReviewDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
