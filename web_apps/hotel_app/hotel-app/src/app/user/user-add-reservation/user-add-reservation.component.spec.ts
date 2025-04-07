import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddReservationComponent } from './user-add-reservation.component';

describe('UserAddReservationComponent', () => {
  let component: UserAddReservationComponent;
  let fixture: ComponentFixture<UserAddReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddReservationComponent]
    });
    fixture = TestBed.createComponent(UserAddReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
