import { TestBed } from '@angular/core/testing';

import { DataSenderService } from './data-sender.service';

describe('DataSenderService', () => {
  let service: DataSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
