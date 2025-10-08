import { TestBed } from '@angular/core/testing';

import { DadataApiService } from './dadata-api.service';

describe('DadataApiService', () => {
  let service: DadataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
