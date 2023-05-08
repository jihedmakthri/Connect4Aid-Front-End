import { TestBed } from '@angular/core/testing';

import { ServiceCandidatureService } from './service-candidature.service';

describe('ServiceCandidatureService', () => {
  let service: ServiceCandidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCandidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
