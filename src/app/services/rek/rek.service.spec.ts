import { TestBed } from '@angular/core/testing';

import { RekService } from './rek.service';

describe('RekService', () => {
  let service: RekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
