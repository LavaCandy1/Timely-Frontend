import { TestBed } from '@angular/core/testing';

import { Reschedule } from './reschedule';

describe('Reschedule', () => {
  let service: Reschedule;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reschedule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
