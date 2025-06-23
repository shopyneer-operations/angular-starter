import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSheglamOffersComponent } from './home-sheglam-offers.component';

describe('HomeSheglamOffersComponent', () => {
  let component: HomeSheglamOffersComponent;
  let fixture: ComponentFixture<HomeSheglamOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSheglamOffersComponent]
    });
    fixture = TestBed.createComponent(HomeSheglamOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
