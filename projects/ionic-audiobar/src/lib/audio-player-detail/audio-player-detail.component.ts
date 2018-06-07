import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ial-audio-player-detail',
  template: `
    <div class="track-detail-panel">
      <div class="panel-controls">
        <button (click)="toggleAudiobar()">close</button>
      </div>
      <div [style.height.px]="parentHeight / 2" class="image-container">
        <img [class.pause-state]="playerStatus === 'paused'"
        [class.play-state]="playerStatus === 'playing'"
        [src]="currentTrack.image"
        height="90%" />
      </div>
      <div class="track-progress-slider">
        <!-- <ion-range
          min="0" max="100"
          (ionChange)="seekAudio($event)"
          [(ngModel)]="percentElapsed">
        </ion-range> -->
      </div>
      <div class="track-time-layout">
        <div class="track-time-elapsed">{{ timeElapsed }}</div>
        <div class="track-time-spacer"></div>
        <div class="track-time-remaining">{{ timeRemaining }}</div>
      </div>
      <div class="track-detail-info">
        <div class="marquee">
          <!-- <h1 [attr.content]="currentTrack.artist" [marqueeContent]="currentTrack.artist">{{ currentTrack.artist }}</h1> -->
        </div>
          <h3>{{ currentTrack.song }}</h3>
      </div>
      <div class="track-controls-layout">
          <ion-button icon-only large clear (click)="previousTrack()" [disabled]="playerStatus === 'loading'" type="button">
            <ion-icon name="rewind"></ion-icon>
          </ion-button>
          <ion-button
            icon-only
            large clear
            (click)="toggleAudio()" [ngSwitch]="playerStatus" [disabled]="playerStatus === 'loading'" class="controls-pp" type="button">
            <ion-icon *ngSwitchCase="'paused'" name="play"></ion-icon>
            <ion-icon *ngSwitchCase="'playing'" name="pause"></ion-icon>
            <ion-spinner *ngSwitchCase="'loading'" name="crescent"></ion-spinner>
          </ion-button>
          <ion-button icon-only large clear
            (click)="nextTrack()"
            [disabled]="playerStatus === 'loading'" type="button">
            <ion-icon name="fastforward"></ion-icon>
          </ion-button>
      </div>
    </div>
  `,
  styles: []
})
export class AudioPlayerDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
