import { TestBed, inject } from '@angular/core/testing';

import { ResetServiceService } from './reset-service.service';

describe('ResetServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetServiceService]
    });
  });

  it('should be created', inject([ResetServiceService], (service: ResetServiceService) => {
    expect(service).toBeTruthy();
  }));
});
