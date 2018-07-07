import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../track.model';
import { PlaylistService } from '../services/playlist.service';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'ial-playlist-slides',
  template: `
  <ion-slides pager="false">
    <ion-slide *ngFor="let track of playlist$ | async; let i = $index;"
      (ionSlideNextEnd)="nextTrack()">
      <ion-img
        [class.pause-state]="playerStatus === 'paused'"
        [class.play-state]="playerStatus === 'playing'"
        [src]="track?.image"
        (ionImgDidLoad)="imageLoadedHander($event)"
        height="90%">
      </ion-img>
    </ion-slide>
  </ion-slides>
  `,
  styles: [`
  `]
})
export class PlaylistSlidesComponent implements OnInit {
  playlist$: Observable<Track[]>;
  currentTrack: Track;

  constructor(
    private playlistService: PlaylistService,
    private audioService: AudioService) {}

  ngOnInit() {
    this.getPlaylist$();
    this.subscribeToCurrentTrack();
  }

  getPlaylist$() {
    this.playlist$ = this.playlistService.getPlaylist();
  }

  subscribeToCurrentTrack() {
    this.audioService.getCurrentTrack()
      .subscribe(track => {
        this.currentTrack = track;
      });
  }

  nextTrack() {
    console.log('hey');
    this.playlistService.nextTrack();
  }

}
