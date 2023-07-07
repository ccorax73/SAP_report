import { TestBed } from '@angular/core/testing';

import { ListerService } from './lister.service';

describe('ListerService', () => {
  let service: ListerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
