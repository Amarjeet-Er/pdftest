import { TestBed } from '@angular/core/testing';

import { BackbtnService } from './backbtn.service';

describe('BackbtnService', () => {
  let service: BackbtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackbtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
