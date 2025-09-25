import { TestBed } from '@angular/core/testing';

import { AdvertApiService } from './advert-api.service';

describe('AdvertApiService', () => {
  let service: AdvertApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
