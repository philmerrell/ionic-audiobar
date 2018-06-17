import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ial-audio-player-detail-modal',
  template: `
    <ion-content (ionScroll)="scrollHandler($event)">
      <div style="width: 100%; height: 30px; position: absolute; text-align: center;">
        <ion-button style="" fill="clear" (click)="modal.dismiss()">
          <ion-icon name="arrow-down" slot="icon-only"></ion-icon>
        </ion-button>
      </div>
      <ial-audio-player-detail></ial-audio-player-detail>
      <ial-playlist></ial-playlist>
    </ion-content>
  `,
  styles: [`
    :host {
      top: 20px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
    }

    .backdrop-md {
      background-color: var(--ion-backdrop-md-color,var(--ion-backdrop-color,#000));
    }
  `]
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
