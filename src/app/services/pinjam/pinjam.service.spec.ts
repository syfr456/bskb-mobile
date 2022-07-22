import { TestBed } from '@angular/core/testing';

import { PinjamService } from './pinjam.service';

describe('PinjamService', () => {
  let service: PinjamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinjamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
