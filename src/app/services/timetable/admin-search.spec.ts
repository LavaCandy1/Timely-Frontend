import { TestBed } from '@angular/core/testing';

import { AdminSearch } from './admin-search';

describe('AdminSearch', () => {
  let service: AdminSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
