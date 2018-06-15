import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ial-audio-player-detail-modal',
  template: `
    <ion-content (pan)="scrollHandler($event)">
      <ion-button style="right: 5px; position: absolute;" fill="clear" (click)="modal.dismiss()">
        <ion-icon name="close" slot="icon-only"></ion-icon>
      </ion-button>
      <ial-audio-player-detail></ial-audio-player-detail>
      <ial-playlist></ial-playlist>
    </ion-content>
  `,
  styles: [``]
})
export class AudioPlayerDetailModalComponent implements OnInit {
  constructor(public zone: NgZone, public modal: ModalController) { }

  ngOnInit() {
    console.log(this.modal);
  }

  scrollHandler(event) {
    this.zone.run(() => {
      console.log(`ScrollEvent: ${event}`);

      // since scrollAmount is data-binded,
      // the update needs to happen in zone
      // this.scrollAmount++
    });
  }

}
