import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ial-audio-player-detail-modal',
  template: `
    <ion-content
      [scrollEvents]="true"
      (ionScroll)="scrollHandler($event)">
      <ial-audio-player-detail (close)="modal.dismiss()"></ial-audio-player-detail>
      <ial-playlist></ial-playlist>
    </ion-content>
  `,
  styles: [`
    :host {
      top: 20px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
    }

  `]
})
export class AudioPlayerDetailModalComponent implements OnInit {
  movePos = 0;

  constructor(public zone: NgZone, public modal: ModalController) { }

  ngOnInit() {}

  // TODO: Refactor into directive called scrollCloser
  scrollHandler(event) {
    this.zone.run(() => {
      console.log(event);
      
    });

  }

}
