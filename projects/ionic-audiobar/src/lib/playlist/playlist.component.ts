import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../track.model';
import { PlaylistService } from '../services/playlist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ial-playlist',
  template: `
    <ion-list>
      <ion-item-sliding *ngFor="let track of playlist$ | async; let i = $index;">
        <ion-item>
          <ion-label [ngClass]="{'playing': track === ( currentTrack | async )}">
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
  currentTrack$: Observable<Track>;
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getPlaylist$();
    this.getCurrentTrack$();
  }

  getPlaylist$() {
    this.playlist$ = this.playlistService.getPlaylist();
  }

  getCurrentTrack$() {
    this.currentTrack$ = this.playlistService.getCurrentTrack();
  }

  remove(track) {
    this.playlistService.remove(track);
  }

}
