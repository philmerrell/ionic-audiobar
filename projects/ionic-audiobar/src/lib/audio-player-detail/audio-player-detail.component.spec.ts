import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerDetailComponent } from './audio-player-detail.component';

describe('AudioPlayerDetailComponent', () => {
  let component: AudioPlayerDetailComponent;
  let fixture: ComponentFixture<AudioPlayerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPlayerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
