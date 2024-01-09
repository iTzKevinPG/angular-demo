import { TestBed } from '@angular/core/testing';

import { AppApiServiceService } from './app-api-service.service';

describe('AppApiServiceService', () => {
  let service: AppApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
