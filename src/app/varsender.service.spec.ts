import { TestBed } from '@angular/core/testing';

import { VarsenderService } from './varsender.service';

describe('VarsenderService', () => {
  let service: VarsenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarsenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
