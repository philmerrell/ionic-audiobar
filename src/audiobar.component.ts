import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AudioService } from './services/audio.service';
import { PlayerPositionService } from './services/player-position.service';
import { PlaylistService } from './services/playlist.service'
import { Track } from './services/track.model';

@Component({
  selector: 'audiobar',
  template: `
    <div #audioBar *ngIf="currentTrack" class="audiobar" [style.bottom.px]="-parentHeight">
      <div class="elapsed-container">
        <div [style.width.%]="percentLoaded" class="percent-loaded"></div>
        <div [style.width.%]="percentElapsed" class="percent-elapsed"></div>
      </div>
      <div class="audiobar-layout">
        <div (click)="toggleAudiobar()" class="audiobar-image">
          <img [src]="currentTrack.image">
        </div>
        <div (click)="toggleAudiobar()" class="audiobar-info-container">
          <div class="audiobar-info">
            <h3>{{ currentTrack.artist }}</h3>
            <h4>{{ currentTrack.song }}</h4>
          </div>
        </div>
        <div class="audiobar-controls-container">
          <div class="audiobar-controls">
            <button ion-button icon-only clear (click)="toggleAudio()" [ngSwitch]="playerStatus" [disabled]="playerStatus === 'loading'" type="button">
              <ion-icon *ngSwitchCase="'paused'" name="play"></ion-icon>
              <ion-icon *ngSwitchCase="'playing'" name="pause"></ion-icon>
              <ion-spinner *ngSwitchCase="'loading'" name="crescent"></ion-spinner>
            </button>
          </div>
        </div>
      </div>
      <div [style.height.px]="parentHeight" class="track-detail-panel">
        <div class="panel-controls">
          <button (click)="toggleAudiobar()">close</button>
        </div>
        <div [style.height.px]="parentHeight / 2" class="image-container">
          <img [class.pause-state]="playerStatus === 'paused'" [class.play-state]="playerStatus === 'playing'" [src]="currentTrack.image" height="90%" />
        </div>
        <div class="track-progress-slider">
          <ion-range min="0" max="100" (ionChange)="seekAudio($event)" [(ngModel)]="percentElapsed"></ion-range>
        </div>
        <div class="track-time-layout">
          <div class="track-time-elapsed">{{ timeElapsed }}</div>
          <div class="track-time-spacer"></div>
          <div class="track-time-remaining">{{ timeRemaining }}</div>
        </div>
        <div class="track-detail-info">
            <h1>{{ currentTrack.artist }}</h1>
            <h3>{{ currentTrack.song }}</h3>
        </div>
        <div class="track-controls-layout">
            <button ion-button icon-only large clear (click)="previousTrack()" [disabled]="playerStatus === 'loading'" type="button">
              <ion-icon name="rewind"></ion-icon>
            </button>
            <button ion-button icon-only large clear (click)="toggleAudio()" [ngSwitch]="playerStatus" [disabled]="playerStatus === 'loading'" class="controls-pp" type="button">
              <ion-icon *ngSwitchCase="'paused'" name="play"></ion-icon>
              <ion-icon *ngSwitchCase="'playing'" name="pause"></ion-icon>
              <ion-spinner *ngSwitchCase="'loading'" name="crescent"></ion-spinner>
            </button>
            <button ion-button icon-only large clear (click)="nextTrack()" [disabled]="playerStatus === 'loading'" type="button">
              <ion-icon name="fastforward"></ion-icon>
            </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .audiobar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      padding: 0;
      background: #f7f7f7;
    }

    .audiobar-layout {
      display: table;
    }

    .audiobar-layout .audiobar-image {
      display: table-cell;
      vertical-align: top;
      position: relative;
      width: 60px;
    }

    .audiobar-layout .audiobar-image img {
      height: 60px;
      width: 60px;
    }

    .audiobar-layout .audiobar-info-container {
      display: table-cell;
      vertical-align: top;
      position: relative;
    }

    .audiobar-layout .audiobar-info-container .audiobar-info {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      padding: 13px 15px;
    }

    .audiobar-layout .audiobar-info-container .audiobar-info h3 {
      font-size: 1.2em;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .audiobar-layout .audiobar-info-container .audiobar-info h4 {
      font-size: 1.1em;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.1em;
    }

    .audiobar-layout .audiobar-controls-container {
      display: table-cell;
      vertical-align: middle;
      position: relative;
      width: 1%;
    }

    .audiobar-layout .audiobar-controls-container .audiobar-controls {
      white-space: nowrap;
    }

    .audiobar-layout .audiobar-controls-container .audiobar-controls button {
      border: 0;
      background: transparent;
      margin-right: 15px;
      outline: none;
      height: 44px;
      width: 44px;
    }

    .audiobar-layout .audiobar-controls-container .audiobar-controls button ion-spinner {
      width: 44px;
      height: 44px;
    }

    .elapsed-container {
      position: relative;
      height: 3px;
      width: 100%;
      padding: 0;
      margin: 0;
    }

    .percent-elapsed {
      position: absolute;
      line-height: 3px;
      height: 3px;
      background-color: orangered;
    }

    .percent-loaded {
      position: absolute;
      line-height: 3px;
      height: 3px;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .track-detail-panel button {
      border: 0;
      background: transparent;
      outline: none;
    }

    .track-detail-panel .panel-controls {
      text-align: right;
    }

    .track-detail-panel .image-container {
      text-align: center;
    }

    .track-detail-panel .image-container .pause-state {
      transform: scale(0.8);
      transition: 300ms cubic-bezier(0.855, 0.005, 0.175, 1);
    }

    .track-detail-panel .image-container .play-state {
      transform: scale(1);
      transition: 300ms cubic-bezier(0.855, 0.005, 0.175, 1);
    }

    .track-detail-panel .track-time-layout {
      display: table;
      padding: 10px;
    }

    .track-detail-panel .track-time-layout .track-time-elapsed {
      display: table-cell;
      vertical-align: top;
      position: relative;
      width: 1%;
    }

    .track-detail-panel .track-time-layout .track-time-spacer {
      display: table-cell;
      vertical-align: top;
      position: relative;
    }

    .track-detail-panel .track-time-layout .track-time-remaining {
      display: table-cell;
      vertical-align: top;
      position: relative;
      width: 1%;
    }

    .track-detail-panel .track-controls-layout {
      text-align: center;
      padding: 10px;
    }

    .track-detail-panel .track-controls-layout .controls-pp {
      margin-left: 20px;
      margin-right: 20px;
      min-width: 60px;
    }

    .track-detail-panel .track-progress-slider {
      text-align: center;
    }

    .track-detail-panel .track-detail-info {
      text-align: center;
      padding: 10px;
    }

    .track-detail-panel .track-detail-info h1 {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-detail-panel .track-detail-info h3 {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class AudiobarComponent implements OnChanges, OnInit {
  // @Input() track: BehaviorSubject<Track>;
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

    console.log('Init Playlist: ', this.playlist);

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

  // ngOnChanges(changes: SimpleChanges) {
  //   let nextTrack = changes['track'].currentValue;
  //   if(nextTrack) {
  //     this.currentTrack = nextTrack;
  //     this.audioService.setCurrentTrack(nextTrack);
  //   }
  // }

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
