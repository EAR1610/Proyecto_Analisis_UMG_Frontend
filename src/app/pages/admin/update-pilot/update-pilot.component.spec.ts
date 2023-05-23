import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePilotComponent } from './update-pilot.component';

describe('UpdatePilotComponent', () => {
  let component: UpdatePilotComponent;
  let fixture: ComponentFixture<UpdatePilotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePilotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
