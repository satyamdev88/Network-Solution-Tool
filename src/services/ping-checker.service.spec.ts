import { TestBed } from '@angular/core/testing';

import { PingCheckerService } from './ping-checker.service';

describe('PingCheckerService', () => {
  let service: PingCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PingCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
