import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ial-audio-player-detail-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Playlist</ion-title>
        <ion-button (click)="modal.dismiss()">
        close
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ial-audio-player-detail></ial-audio-player-detail>
    </ion-content>
  `,
  styles: [``]
})
export class AudioPlayerDetailModalComponent implements OnInit {
  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

}
