import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChangeList } from './room-change-list';

describe('RoomChangeList', () => {
  let component: RoomChangeList;
  let fixture: ComponentFixture<RoomChangeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomChangeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomChangeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
