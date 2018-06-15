import { TestBed, inject } from '@angular/core/testing';

import { NprService } from './npr.service';

describe('NprService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NprService]
    });
  });

  it('should be created', inject([NprService], (service: NprService) => {
    expect(service).toBeTruthy();
  }));
});
