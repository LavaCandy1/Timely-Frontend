import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlotForm } from './add-slot-form';

describe('AddSlotForm', () => {
  let component: AddSlotForm;
  let fixture: ComponentFixture<AddSlotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSlotForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSlotForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
