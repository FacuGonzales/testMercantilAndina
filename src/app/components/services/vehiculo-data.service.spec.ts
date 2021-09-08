import { TestBed } from '@angular/core/testing';

import { VehiculoDataService } from './vehiculo-data.service';

describe('VehiculoDataService', () => {
  let service: VehiculoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
