import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirplaneComponent } from './add-airplane.component';

describe('AddAirplaneComponent', () => {
  let component: AddAirplaneComponent;
  let fixture: ComponentFixture<AddAirplaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAirplaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAirplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
