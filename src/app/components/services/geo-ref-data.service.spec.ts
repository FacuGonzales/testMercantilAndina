import { TestBed } from '@angular/core/testing';

import { GeoRefDataService } from './geo-ref-data.service';

describe('GeoRefDataService', () => {
  let service: GeoRefDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoRefDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
