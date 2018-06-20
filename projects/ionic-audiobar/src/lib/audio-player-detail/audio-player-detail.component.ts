import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../track.model';
import { AudioService } from '../services/audio.service';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'ial-audio-player-detail',
  template: `
    <div class="track-detail-panel">
      <div class="close-controls">
        <ion-button fill="clear" (click)="closeDetail()">
          <ion-icon name="arrow-down" slot="icon-only"></ion-icon>
        </ion-button>
      </div>
      <!-- // TODO: Find better image sizing solution -->
      <div class="background-texture">
        <div class="background-texture-image">
          <img [src]="(currentTrack$ | async)?.image">
        </div>
      </div>
      <div [style.height.px]="modalHeight / 2" class="image-container">
        <ion-img
          [class.pause-state]="playerStatus === 'paused'"
          [class.play-state]="playerStatus === 'playing'"
          [src]="(currentTrack$ | async)?.image"
          (ionImgDidLoad)="imageLoadedHander($event)"
          height="90%">
        </ion-img>
      </div>
      <div [style.height.px]="modalHeight * 0.25" class="track-detail-controls-container">
        <div class="track-progress-slider">
          <ion-range
            class="md"
            min="0" max="100"
            (ionFocus)="setIsSeeking()"
            (ionBlur)="seekAudio($event.target.value)"
            [(ngModel)]="percentElapsed">
          </ion-range>
        </div>
        <div class="track-time-layout">
          <div class="track-time-elapsed">{{ timeElapsed$ | async }}</div>
          <div class="track-time-spacer"></div>
          <div class="track-time-remaining">{{ timeRemaining$ | async }}</div>
        </div>
        <div class="track-detail-info">
          <h3 [attr.content]="(currentTrack$ | async)?.artist">
            {{ (currentTrack$ | async)?.artist }}
          </h3>
          <h5 [attr.content]="(currentTrack$ | async)?.song">
            {{ (currentTrack$ | async)?.song }}
          </h5>
        </div>
      </div>
      <div [style.height.px]="modalHeight * 0.25">
        <div class="track-controls-layout">
          <ion-button
            fill="clear"
            size="large"
            (click)="previousTrack()"
            [disabled]="playerStatus === 'loading'">
            <ion-icon name="rewind"></ion-icon>
          </ion-button>
          <ion-button
            style="width: 100px;"
            fill="clear"
            size="large"
            (click)="toggleAudio()" [ngSwitch]="playerStatus" [disabled]="playerStatus === 'loading'" class="controls-pp" type="button">
            <ion-icon *ngSwitchCase="'paused'" name="play" slot="icon-only"></ion-icon>
            <ion-icon *ngSwitchCase="'playing'" name="pause" slot="icon-only"></ion-icon>
            <ion-spinner *ngSwitchCase="'loading'" name="crescent"></ion-spinner>
          </ion-button>
          <ion-button
            size="large"
            fill="clear"
            (click)="nextTrack()"
            [disabled]="playerStatus === 'loading'">
            <ion-icon name="fastforward"></ion-icon>
          </ion-button>
        </div>
      </div>
    </div>
  `,
  styles: [`

    .close-controls {
      width: 100%;
      height: 20px;
      text-align: center;

    }

    .close-controls ion-button {
      margin: 0;
    }

    .background-texture {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -1;
    }

    .background-texture-image {
      min-width: 110%;
      min-height: 100vh;
      margin: -5%;
      background: none;
    }

    .background-texture-image img {
      display: block;
      max-width: none;
      max-height: none;
      min-width: 100%;
      min-height: 100vh;
      opacity: 0.3;
      -ms-filter: blur(20px);
      -webkit-filter: blur(20px);
      filter: blur(20px);
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .image-container .pause-state {
			transform: scale(0.8);
			transition: 300ms cubic-bezier(0.855, 0.005, 0.175, 1);
		}
		.image-container .play-state {
			transform: scale(1);
			transition: 300ms cubic-bezier(0.855, 0.005, 0.175, 1);
		}

    .image-container {
      text-align: center;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 20px;
      padding-bottom: 0px;
    }
    .track-detail-panel button {
      border: 0;
      background: transparent;
      outline: none;
    }

    .track-detail-panel .image-container {
      text-align: center;
    }

    .image-container .pause-state {
      transform: scale(0.8);
      transition: 300ms cubic-bezier(0.855, 0.005, 0.175, 1);
    }
    .play-state {
      transform: scale(1);
      transition: 300ms cubic-bezier(0.855, 0.005, 0.175, 1);
    }
    .track-time-layout {
      display: table;
      padding-top: 0;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 0;
      font-size: 0.8em;
      color: #666;
    }

    .track-time-layout .track-time-elapsed {
      display: table-cell;
      vertical-align: top;
      position: relative;
      width: 1%;
    }
    .track-time-layout .track-time-spacer {
      display: table-cell;
      vertical-align: top;
      position: relative;
    }
    .track-time-layout  .track-time-remaining {
      display: table-cell;
      vertical-align: top;
      position: relative;
      width: 1%;
    }
    .track-controls-layout {
      text-align: center;
      padding: 10px;
    }

    .track-controls-layout .controls-pp {
      margin-left: 20px;
      margin-right: 20px;
      min-width: 60px;
    }

    .track-progress-slider {
      text-align: center;
    }
    .track-detail-info {
      padding-left: 10px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
    }

    @keyframes marquee {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(-100%, 0);
      }
    }
  `]
})
export class AudioPlayerDetailComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  currentTrack$: Observable<Track>;
  modalHeight: number;
  percentElapsed;
  playerStatus;
  imageLoaded = false;
  isSeeking = false;
  timeElapsed$: Observable<string>;
  timeRemaining$: Observable<string>;
  constructor(private audioService: AudioService, private playlistService: PlaylistService) { }

  ngOnInit() {
    this.currentTrack$ = this.audioService.getCurrentTrack();
    this.subscribeToPlayerStatus();
    this.getPercentElapsed$();
    this.getTimeElapsed$();
    this.getTimeRemaining$();
    this.getModalHeight();
  }

  closeDetail() {
    this.close.emit(true);
  }

  getModalHeight() {
    const modal = document.querySelector('ion-modal');
    this.modalHeight = modal.clientHeight;
  }

  nextTrack() {
    this.imageLoaded = false;
    this.playlistService.nextTrack();
  }

  previousTrack() {
    this.imageLoaded = false;
    this.playlistService.previousTrack();
  }

  seekAudio(value) {
    this.isSeeking = false;
    const position = value / (100 / this.audioService.getAudioElement().duration);
    this.audioService.seekAudio(position);
  }

  setIsSeeking() {
    this.isSeeking = true;
  }

  toggleAudio() {
    this.audioService.toggleAudio();
  }

  imageLoadedHander(event) {
    this.imageLoaded = true;
  }

  private getPercentElapsed$() {
    this.audioService.getPercentElapsed()
      .subscribe(percent => {
        if (!this.isSeeking) {
          this.percentElapsed = percent;
        }
      });
  }

  private getTimeRemaining$() {
    this.timeRemaining$ = this.audioService.getTimeRemaining();
  }

  private getTimeElapsed$() {
    this.timeElapsed$ = this.audioService.getTimeElapsed();
  }

  private subscribeToPlayerStatus() {
    this.audioService.getPlayerStatus()
        .subscribe(status => {
          this.playerStatus = status;
        });
  }

}
