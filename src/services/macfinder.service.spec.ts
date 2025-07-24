import { TestBed } from '@angular/core/testing';

import { MacfinderService } from './macfinder.service';

describe('MacfinderService', () => {
  let service: MacfinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacfinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
