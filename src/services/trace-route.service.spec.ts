import { TestBed } from '@angular/core/testing';

import { TraceRouteService } from './trace-route.service';

describe('TraceRouteService', () => {
  let service: TraceRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraceRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
