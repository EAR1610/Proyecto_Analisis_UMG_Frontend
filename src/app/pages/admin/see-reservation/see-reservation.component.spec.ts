import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeReservationComponent } from './see-reservation.component';

describe('SeeReservationComponent', () => {
  let component: SeeReservationComponent;
  let fixture: ComponentFixture<SeeReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
