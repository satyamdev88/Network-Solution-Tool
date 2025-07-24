import { TestBed } from '@angular/core/testing';

import { PortCheckerService } from './port-checker.service';

describe('PortCheckerService', () => {
  let service: PortCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
