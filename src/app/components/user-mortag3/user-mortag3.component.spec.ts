import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMortag3Component } from './user-mortag3.component';

describe('UserMortag3Component', () => {
  let component: UserMortag3Component;
  let fixture: ComponentFixture<UserMortag3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMortag3Component]
    });
    fixture = TestBed.createComponent(UserMortag3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
