import { TestBed, inject } from '@angular/core/testing';

import { IonicAudiobarService } from './ionic-audiobar.service';

describe('IonicAudiobarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IonicAudiobarService]
    });
  });

  it('should be created', inject([IonicAudiobarService], (service: IonicAudiobarService) => {
    expect(service).toBeTruthy();
  }));
});
