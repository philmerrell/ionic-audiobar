import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Track } from './services/track.model';
import { AudioService } from './services/audio.service';
import { PlaylistService } from './services/playlist.service';

@Component({
  selector: 'audiobar',
  templateUrl: './audiobar.component.html'
})
export class AudiobarComponent implements OnChanges, OnInit {
  @Input() playlist: Track[];

  public currentTrack: Track;

  constructor(private audioService: AudioService, private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getPlayerStatus();
    this.currentTrack = this.playlist[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playlist'].currentValue) {
      let changedPlaylist = changes['playlist'].currentValue;
      this.playlistService.setPlaylist(changedPlaylist);
      this.playlist = changedPlaylist;
    }
  }

  public getPlayerStatus() {
    this.audioService.getPlayerStatus()
      .debounceTime(100)
      .subscribe((status) => {
        if (status === 'ended') {
          this.checkPlaylist();
        }
      });
  }

  private playTrack(track) {
    this.currentTrack = track;
  }

  private checkPlaylist() {
    let progress = this.playlist.indexOf(this.currentTrack) + 1;
    if (progress === this.playlist.length) {
      this.playTrack(this.playlist[0]);
      this.audioService.seekAudio(0);
      this.audioService.pauseAudio();
    } else {
      this.playTrack(this.playlist[progress]);
    }
  }

}
