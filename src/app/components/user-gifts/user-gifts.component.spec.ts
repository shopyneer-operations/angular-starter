import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGiftsComponent } from './user-gifts.component';

describe('UserGiftsComponent', () => {
  let component: UserGiftsComponent;
  let fixture: ComponentFixture<UserGiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGiftsComponent]
    });
    fixture = TestBed.createComponent(UserGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
