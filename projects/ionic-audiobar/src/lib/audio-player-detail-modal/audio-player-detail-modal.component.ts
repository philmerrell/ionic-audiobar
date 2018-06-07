import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ial-audio-player-detail-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Playlist</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ial-audio-player-detail></ial-audio-player-detail>
    </ion-content>
  `,
  styles: [``]
})
export class AudioPlayerDetailModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
