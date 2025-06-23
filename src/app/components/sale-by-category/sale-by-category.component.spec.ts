import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByCategoryComponent } from './sale-by-category.component';

describe('SaleByCategoryComponent', () => {
  let component: SaleByCategoryComponent;
  let fixture: ComponentFixture<SaleByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleByCategoryComponent]
    });
    fixture = TestBed.createComponent(SaleByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
