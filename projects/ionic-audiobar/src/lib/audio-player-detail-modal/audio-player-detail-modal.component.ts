import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ial-audio-player-detail-modal',
  template: `
    <ion-content>
      <ion-button style="right: 5px; position: absolute;" fill="clear" (click)="modal.dismiss()">
        <ion-icon name="close" slot="icon-only"></ion-icon>
      </ion-button>
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
