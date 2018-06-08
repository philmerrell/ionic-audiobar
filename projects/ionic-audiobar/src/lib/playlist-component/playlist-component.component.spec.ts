import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistComponentComponent } from './playlist-component.component';

describe('PlaylistComponentComponent', () => {
  let component: PlaylistComponentComponent;
  let fixture: ComponentFixture<PlaylistComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
