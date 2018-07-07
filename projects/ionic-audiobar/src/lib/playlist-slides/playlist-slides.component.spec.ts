import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSlidesComponent } from './playlist-slides.component';

describe('PlaylistSlidesComponent', () => {
  let component: PlaylistSlidesComponent;
  let fixture: ComponentFixture<PlaylistSlidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistSlidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
