import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AudioService } from './services/audio.service';
import { PlayerPositionService } from './services/player-position.service';
import { PlaylistService } from './services/playlist.service'
import { Track } from './services/track.model';

@Component({
  selector: 'audiobar',
  templateUrl: './audiobar.component.html',
  styleUrls: ['./audiobar.scss']
})
export class AudiobarComponent implements OnChanges, OnInit {
  @Input() playlist: Track[];
  @ViewChild('audioBar') audioBar;

  public timeElapsed: string;
  public timeRemaining: string;
  public percentElapsed: number;
  public percentLoaded: number;
  public playerStatus: string;

  private audiobarVisible: boolean = false;
  private currentTrack: Track;
  private parentHeight: number;

  constructor(private audioService: AudioService,
              private positionService: PlayerPositionService,
              private playlistService: PlaylistService) { }

  ngOnInit() {
    if(this.playlist && this.playlist.length) {
      this.currentTrack = this.playlist[0];
    }

    this.getPlayerStatus();
    this.getTimeElapsed();
    this.getTimeRemaining();
    this.getPercentLoaded();
    this.getPercentElapsed();
    this.getPlaylist();
    this.initPlayerPosition();
  }

  ngOnChanges(changes: SimpleChanges) {
    let changedPlaylist = changes['playlist'].currentValue;

    if (changedPlaylist) {
      this.playlistService.setPlaylist(changedPlaylist);
      this.setCurrentTrack(changedPlaylist[0]);
      this.playlist = changedPlaylist;
    }
  }

  private initPlayerPosition() {
    this.parentHeight = this.positionService.getInnerHeight();
  }

  public toggleAudio() {
    this.audioService.toggleAudio();
    return false;
  }

  private checkPlaylist() {
    let nextTrackIndex = this.playlist.indexOf(this.currentTrack) + 1;
    if (nextTrackIndex === this.playlist.length) {
      this.setCurrentTrack(this.playlist[0]);
      this.audioService.seekAudio(0);
      this.audioService.pauseAudio();
    } else {
      this.setCurrentTrack(this.playlist[nextTrackIndex]);
    }
  }

  public getTimeElapsed() {
    this.audioService.getTimeElapsed()
      .subscribe(time => this.timeElapsed = time);
  }

  public getTimeRemaining() {
    this.audioService.getTimeRemaining()
      .subscribe(time => this.timeRemaining = time);
  }

  public getPercentElapsed() {
    this.audioService.getPercentElapsed()
      .subscribe(percent => this.percentElapsed = percent);
  }

  public getPercentLoaded() {
    this.audioService.getPercentLoaded()
      .subscribe(percent => this.percentLoaded = percent);
  }

  public getPlayerStatus() {
    this.audioService.getPlayerStatus()
      .debounceTime(100)
      .subscribe(status => {
        this.playerStatus = status
        if (status === 'ended') {
          this.checkPlaylist();
        }
      });
  }

  private getPlaylist() {
    this.playlistService.getPlaylist()
      .subscribe(playlist => this.playlist = playlist);
  }

  public seekAudio(event) {
    let position = event.value / (100 / this.audioService.getAudio().duration);
    this.audioService.seekAudio(position);
  }

  private setCurrentTrack(track) {
    if(track) {
      this.currentTrack = track;
      this.audioService.setCurrentTrack(track);
    }
  }

  public toggleAudiobar() {
    (this.audiobarVisible) ? this.closeAudiobar() : this.openAudiobar();
    this.audiobarVisible = !this.audiobarVisible;
  }

  public openAudiobar() {
    let audioBar = this.audioBar.nativeElement;
    audioBar.style['transition'] = '300ms cubic-bezier(0.855, 0.005, 0.175, 1)';
    audioBar.style['transform'] = 'translate3d(0, -' + (this.parentHeight) + 'px, 0)';
  }

  public previousTrack() {
    let index = this.playlist.indexOf(this.currentTrack);
    this.setCurrentTrack(this.playlist[index - 1]);
  }

  public nextTrack() {
    let index = this.playlist.indexOf(this.currentTrack);
    this.setCurrentTrack(this.playlist[index + 1]);
  }

  public closeAudiobar() {
    let audioBar = this.audioBar.nativeElement;
    audioBar.style['transition'] = '300ms cubic-bezier(0.855, 0.005, 0.175, 1)';
    audioBar.style['transform'] = 'translate3d(0, 0, 0)';
  }
}
