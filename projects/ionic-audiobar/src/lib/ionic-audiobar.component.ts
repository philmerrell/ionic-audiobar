import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ial-ionic-audiobar',
  template: `
  <div class="audiobar">
    <ial-audio-player></ial-audio-player>
    <ial-audio-player-detail></ial-audio-player-detail>
  </div>
  `,
  styles: [`
    .audiobar {
      position: fixed;
      bottom: 60px;
      left: 0;
      right: 0;
      z-index: 9999;
      padding: 0;
      background: #f7f7f7;
    }
  `]
})
export class IonicAudiobarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
