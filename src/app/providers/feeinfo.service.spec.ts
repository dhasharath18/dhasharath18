import { TestBed } from '@angular/core/testing';

import { FeeinfoService } from './feeinfo.service';

describe('FeeinfoService', () => {
  let service: FeeinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
