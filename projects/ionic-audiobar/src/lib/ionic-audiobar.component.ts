import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Track } from './track.model';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'ial-ionic-audiobar',
  template: `
    <div ialAudioBarPosition [offset]="offset" class="audiobar">
      <ial-audio-player [track]="currentTrack" (ended)="getNextTrack($event)"></ial-audio-player>
      <ial-audio-player-detail></ial-audio-player-detail>
    </div>
  `,
  styles: [`
    .audiobar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      padding: 0;
      background: #f7f7f7;
    }
  `]
})
export class IonicAudiobarComponent implements OnInit, OnChanges {

  @Input() playlist: Track[];
  @Input() offset;
  currentTrack: Track;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const changedPlaylist = changes['playlist'].currentValue;
    if (changedPlaylist) {
      this.playlistService.setPlaylist(changedPlaylist);
      this.setCurrentTrack(changedPlaylist[0]);
    }
  }

  private setCurrentTrack(track) {
    if (track) {
      this.currentTrack = track;
    }
  }

  private getNextTrack() {
    const index = this.playlist.findIndex(track => track === this.currentTrack);
    const nextTrack = this.playlist[index + 1];
    this.setCurrentTrack(nextTrack);
  }

}
