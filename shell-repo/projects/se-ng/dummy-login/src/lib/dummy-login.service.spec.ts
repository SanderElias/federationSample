import { TestBed } from '@angular/core/testing';

import { DummyLoginService } from './dummy-login.service';

describe('DummyLoginService', () => {
  let service: DummyLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
