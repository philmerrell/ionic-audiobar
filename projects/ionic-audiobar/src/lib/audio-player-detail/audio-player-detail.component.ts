import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../track.model';
import { AudioService } from '../services/audio.service';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'ial-audio-player-detail',
  template: `
    <div class="track-detail-panel">
      <div [style.height.px]="modalHeight / 2" class="image-container">
        <ion-img [class.pause-state]="playerStatus === 'paused'"
          [class.play-state]="playerStatus === 'playing'"
          [src]="(currentTrack$ | async)?.image"
          height="90%">
        </ion-img>
      </div>
      <div [style.height.px]="modalHeight / 2" class="track-detail-controls-container">
        <div class="track-progress-slider">
          <ion-range
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
          <h1 [attr.content]="(currentTrack$ | async)?.artist">
            {{ (currentTrack$ | async)?.artist }}
          </h1>
          <h3 [attr.content]="(currentTrack$ | async)?.song">
            {{ (currentTrack$ | async)?.song }}
          </h3>
        </div>
        <div class="track-controls-layout">
            <ion-button fill="clear"
              (click)="previousTrack()"
              [disabled]="playerStatus === 'loading'">
              <ion-icon name="rewind"></ion-icon>
            </ion-button>
            <ion-button
              fill="clear"
              size="large"
              (click)="toggleAudio()" [ngSwitch]="playerStatus" [disabled]="playerStatus === 'loading'" class="controls-pp" type="button">
              <ion-icon *ngSwitchCase="'paused'" name="play" slot="icon-only"></ion-icon>
              <ion-icon *ngSwitchCase="'playing'" name="pause" slot="icon-only"></ion-icon>
              <ion-spinner *ngSwitchCase="'loading'" name="crescent"></ion-spinner>
            </ion-button>
            <ion-button
              fill="clear"
              (click)="nextTrack(currentTrack$)"
              [disabled]="playerStatus === 'loading'">
              <ion-icon name="fastforward"></ion-icon>
            </ion-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
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
      padding: 20px;
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
      padding: 10px;
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
  currentTrack$: Observable<Track>;
  modalHeight: number;
  percentElapsed;
  playerStatus;
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

  getModalHeight() {
    const modal = document.querySelector('ion-modal');
    console.log(modal);
    this.modalHeight = modal.clientHeight;
  }

  nextTrack(track: Track) {
    this.playlistService.nextTrack();
  }

  seekAudio(value) {
    this.isSeeking = false;
    const position = value / (100 / this.audioService.getAudio().duration);
    this.audioService.seekAudio(position);
  }

  setIsSeeking() {
    this.isSeeking = true;
  }

  toggleAudio() {
    this.audioService.toggleAudio();
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
