import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerDetailModalComponent } from './audio-player-detail-modal.component';

describe('AudioPlayerDetailModalComponent', () => {
  let component: AudioPlayerDetailModalComponent;
  let fixture: ComponentFixture<AudioPlayerDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPlayerDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayerDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
