import { TestBed } from '@angular/core/testing';

import { EvenetService } from './event.service';

describe('EvenetService', () => {
  let service: EvenetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
