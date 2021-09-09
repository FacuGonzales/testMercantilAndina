import { TestBed } from '@angular/core/testing';

import { CoberturaDataService } from './cobertura-data.service';

describe('CoberturaDataService', () => {
  let service: CoberturaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoberturaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
