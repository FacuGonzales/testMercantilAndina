import { TestBed } from '@angular/core/testing';

import { CiudadDataService } from './ciudad-data.service';

describe('CiudadDataService', () => {
  let service: CiudadDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiudadDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
