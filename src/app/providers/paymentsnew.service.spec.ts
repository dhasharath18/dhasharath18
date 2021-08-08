import { TestBed } from '@angular/core/testing';

import { PaymentsnewService } from './paymentsnew.service';

describe('PaymentsnewService', () => {
  let service: PaymentsnewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsnewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
