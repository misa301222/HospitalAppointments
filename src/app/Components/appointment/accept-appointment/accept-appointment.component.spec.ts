import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptAppointmentComponent } from './accept-appointment.component';

describe('AcceptAppointmentComponent', () => {
  let component: AcceptAppointmentComponent;
  let fixture: ComponentFixture<AcceptAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
