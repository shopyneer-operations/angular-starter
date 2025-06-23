import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipingPolicyComponent } from './shiping-policy.component';

describe('ShipingPolicyComponent', () => {
  let component: ShipingPolicyComponent;
  let fixture: ComponentFixture<ShipingPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipingPolicyComponent]
    });
    fixture = TestBed.createComponent(ShipingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
