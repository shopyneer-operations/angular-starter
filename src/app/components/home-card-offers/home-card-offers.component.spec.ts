import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCardOffersComponent } from './home-card-offers.component';

describe('HomeCardOffersComponent', () => {
  let component: HomeCardOffersComponent;
  let fixture: ComponentFixture<HomeCardOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCardOffersComponent]
    });
    fixture = TestBed.createComponent(HomeCardOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
