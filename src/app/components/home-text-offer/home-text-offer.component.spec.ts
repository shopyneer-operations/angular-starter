import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTextOfferComponent } from './home-text-offer.component';

describe('HomeTextOfferComponent', () => {
  let component: HomeTextOfferComponent;
  let fixture: ComponentFixture<HomeTextOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTextOfferComponent]
    });
    fixture = TestBed.createComponent(HomeTextOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
