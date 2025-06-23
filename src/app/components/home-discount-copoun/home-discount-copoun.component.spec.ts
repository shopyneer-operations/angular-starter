import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscountCopounComponent } from './home-discount-copoun.component';

describe('HomeDiscountCopounComponent', () => {
  let component: HomeDiscountCopounComponent;
  let fixture: ComponentFixture<HomeDiscountCopounComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDiscountCopounComponent]
    });
    fixture = TestBed.createComponent(HomeDiscountCopounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
