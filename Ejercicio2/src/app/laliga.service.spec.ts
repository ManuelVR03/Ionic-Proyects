import { TestBed } from '@angular/core/testing';

import { LaligaService } from './laliga.service';

describe('LaligaService', () => {
  let service: LaligaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaligaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
