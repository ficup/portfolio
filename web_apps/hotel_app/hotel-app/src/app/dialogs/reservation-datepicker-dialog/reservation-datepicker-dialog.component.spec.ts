import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDatepickerDialogComponent } from './reservation-datepicker-dialog.component';

describe('ReservationDatepickerDialogComponent', () => {
  let component: ReservationDatepickerDialogComponent;
  let fixture: ComponentFixture<ReservationDatepickerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationDatepickerDialogComponent]
    });
    fixture = TestBed.createComponent(ReservationDatepickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
