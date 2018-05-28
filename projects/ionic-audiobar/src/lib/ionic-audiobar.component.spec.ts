import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicAudiobarComponent } from './ionic-audiobar.component';

describe('IonicAudiobarComponent', () => {
  let component: IonicAudiobarComponent;
  let fixture: ComponentFixture<IonicAudiobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicAudiobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicAudiobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
