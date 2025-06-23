import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnExchangePolicyComponent } from './return-exchange-policy.component';

describe('ReturnExchangePolicyComponent', () => {
  let component: ReturnExchangePolicyComponent;
  let fixture: ComponentFixture<ReturnExchangePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnExchangePolicyComponent]
    });
    fixture = TestBed.createComponent(ReturnExchangePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
