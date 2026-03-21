import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraClassList } from './extra-class-list';

describe('ExtraClassList', () => {
  let component: ExtraClassList;
  let fixture: ComponentFixture<ExtraClassList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraClassList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraClassList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
