import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageAboutComponent } from './admin-manage-about.component';

describe('AdminManageAboutComponent', () => {
  let component: AdminManageAboutComponent;
  let fixture: ComponentFixture<AdminManageAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageAboutComponent]
    });
    fixture = TestBed.createComponent(AdminManageAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
