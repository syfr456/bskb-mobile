import { TestBed } from '@angular/core/testing';

import { JemputService } from './jemput.service';

describe('JemputService', () => {
  let service: JemputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JemputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
