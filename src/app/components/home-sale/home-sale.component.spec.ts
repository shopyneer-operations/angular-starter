import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSaleComponent } from './home-sale.component';

describe('HomeSaleComponent', () => {
  let component: HomeSaleComponent;
  let fixture: ComponentFixture<HomeSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSaleComponent]
    });
    fixture = TestBed.createComponent(HomeSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
