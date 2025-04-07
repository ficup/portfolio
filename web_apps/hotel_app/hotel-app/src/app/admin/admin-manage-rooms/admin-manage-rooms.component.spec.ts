import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageRoomsComponent } from './admin-manage-rooms.component';

describe('AdminManageRoomsComponent', () => {
  let component: AdminManageRoomsComponent;
  let fixture: ComponentFixture<AdminManageRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageRoomsComponent]
    });
    fixture = TestBed.createComponent(AdminManageRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
