import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../track.model';
import { PlaylistService } from '../services/playlist.service';
import { Observable } from 'rxjs';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'ial-playlist',
  template: `
    <ion-list>
      <ion-list-header>
        <ion-label>Playlist</ion-label>
      </ion-list-header>
      <ion-item-sliding (click)="setCurrentTrack(track)" *ngFor="let track of playlist$ | async; let i = $index;">
        <ion-item>
          <ion-label [ngClass]="{'playing': track === currentTrack}">
            {{ track.song }}
          </ion-label>
        </ion-item>
        <ion-item-options side="start">
          <ion-item-option color="danger" (click)="remove(track)">Remove</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `,
  styles: [`
    .playing {
      font-weight: bold;
    }
  `]
})
export class PlaylistComponent implements OnInit {
  playlist$: Observable<Track[]>;
  currentTrack: Track;
  constructor(
    private playlistService: PlaylistService,
    private audioService: AudioService) { }

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

  remove(track) {
    this.playlistService.remove(track);
  }

  setCurrentTrack(track: Track) {
    this.audioService.setCurrentTrack(track);
  }

}
