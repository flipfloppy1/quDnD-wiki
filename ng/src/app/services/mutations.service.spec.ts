import { TestBed } from '@angular/core/testing';

import { MutationsService } from './mutations.service';

describe('MutationsService', () => {
  let service: MutationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
