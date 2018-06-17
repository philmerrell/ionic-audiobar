import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Track } from '../track.model';
import { AudioService } from '../services/audio.service';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ial-audio-player',
  template: `
    <div class="audiobar-layout">
      <div class="audiobar-controls-container">
        <div class="audiobar-controls">
          <ion-button fill="clear"
            (click)="toggleAudio()"
            [ngSwitch]="playerStatus"
            [disabled]="playerStatus === 'loading'" type="button">
            <ion-icon *ngSwitchCase="'paused'" name="play" slot="icon-only"></ion-icon>
            <ion-icon *ngSwitchCase="'playing'" name="pause" slot="icon-only"></ion-icon>
            <ion-spinner *ngSwitchCase="'loading'" name="crescent"></ion-spinner>
          </ion-button>
        </div>
      </div>
      <div (click)="openAudioPlayerDetail()" class="audiobar-info-container">
        <div class="audiobar-info">
          <h3>{{ track.artist }}</h3>
          <h4>{{ track.song }}</h4>
        </div>
      </div>
    </div>
    <div class="elapsed-container">
      <div [style.width.%]="percentLoaded$ | async" class="percent-loaded"></div>
      <div [style.width.%]="percentElapsed$ | async" class="percent-elapsed"></div>
    </div>
  `,
  styles: [`
  .audiobar-image {
    display: table-cell;
    vertical-align: top;
    position: relative;
    width: 60px;
  }

  .audiobar-image img {
    height: 60px;
    width: 60px;
  }

  .audiobar-layout .audiobar-info-container {
    display: table-cell;
    vertical-align: top;
    position: relative;
  }

  .audiobar-info-container .audiobar-info {
    position: absolute;
    left: 0;
    right: 0;
    text-align: left;
    padding: 7px 0px;
  }

  .audiobar-info h3 {
    font-size: 1.2em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .audiobar-info h4 {
    font-size: 1.1em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2em;
  }

  .audiobar-layout .audiobar-controls-container {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    width: 1%;
  }

  .audiobar-controls-container .audiobar-controls {
    white-space: nowrap;
  }

  .audiobar-controls button {
    border: 0;
    background: transparent;
    margin-right: 15px;
    outline: none;
    height: 44px;
    width: 44px;
  }

  button ion-spinner {
    width: 44px;
    height: 44px;
  }

  .audiobar-layout {
    display: table;
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
    background-color: black;
  }
  .percent-loaded {
    position: absolute;
    line-height: 3px;
    height: 3px;
    background-color: rgba(0,0,0,0.4);
  }
  `]
})
export class AudioPlayerComponent implements OnInit, OnChanges {
  @Input() track: Track;
  @Output() ended: EventEmitter<Track> = new EventEmitter();
  @Output() open: EventEmitter<boolean> = new EventEmitter();

  timeElapsed$: Observable<string>;
  timeRemaining$: Observable<string>;
  percentElapsed$: Observable<number>;
  percentLoaded$: Observable<number>;
  playerStatus: string;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.getPercentElapsed();
    this.getPercentLoaded();
    this.getPlayerStatus();
    this.getTimeElapsed();
    this.getTimeRemaining();
  }

  ngOnChanges(changes: SimpleChanges) {
    const changedTrack = changes['track'].currentValue;
    if (changedTrack) {
      this.audioService.setCurrentTrack(changedTrack);
    }
  }

  getTimeElapsed() {
    this.timeElapsed$ = this.audioService.getTimeElapsed();
  }

  getTimeRemaining() {
    this.timeRemaining$ = this.audioService.getTimeRemaining();
  }

  getPercentElapsed() {
    this.percentElapsed$ = this.audioService.getPercentElapsed();
  }

  getPercentLoaded() {
    this.percentLoaded$ = this.audioService.getPercentLoaded();
  }

  getPlayerStatus() {
    this.audioService.getPlayerStatus()
      .pipe(debounceTime(100))
      .subscribe(status => {
        this.playerStatus = status;
        if (status === 'ended') {
          this.ended.emit(this.track);
        }
      });
  }

  toggleAudio() {
    this.audioService.toggleAudio();
    return false;
  }

  openAudioPlayerDetail() {
    this.open.emit(true);
  }

}
