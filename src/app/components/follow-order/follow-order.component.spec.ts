import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowOrderComponent } from './follow-order.component';

describe('FollowOrderComponent', () => {
  let component: FollowOrderComponent;
  let fixture: ComponentFixture<FollowOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowOrderComponent]
    });
    fixture = TestBed.createComponent(FollowOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
