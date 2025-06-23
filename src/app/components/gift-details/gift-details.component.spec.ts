import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftDetailsComponent } from './gift-details.component';

describe('GiftDetailsComponent', () => {
  let component: GiftDetailsComponent;
  let fixture: ComponentFixture<GiftDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiftDetailsComponent]
    });
    fixture = TestBed.createComponent(GiftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
