import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOffersComponent } from './home-offers.component';

describe('HomeOffersComponent', () => {
  let component: HomeOffersComponent;
  let fixture: ComponentFixture<HomeOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeOffersComponent]
    });
    fixture = TestBed.createComponent(HomeOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
