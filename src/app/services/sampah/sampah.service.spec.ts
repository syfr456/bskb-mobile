import { TestBed } from '@angular/core/testing';

import { SampahService } from './sampah.service';

describe('SampahService', () => {
  let service: SampahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
