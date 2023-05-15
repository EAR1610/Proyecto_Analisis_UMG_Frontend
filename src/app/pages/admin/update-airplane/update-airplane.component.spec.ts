import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAirplaneComponent } from './update-airplane.component';

describe('UpdateAirplaneComponent', () => {
  let component: UpdateAirplaneComponent;
  let fixture: ComponentFixture<UpdateAirplaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAirplaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAirplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
