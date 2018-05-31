import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ial-audio-player',
  template: `
  <div class="elapsed-container">
  <div [style.width.%]="50" class="percent-loaded"></div>
  <div [style.width.%]="25" class="percent-elapsed"></div>
</div>
<div class="audiobar-layout">
  <div class="audiobar-image">
    <!--<img [src]="currentTrack.image">-->
  </div>
  <div class="audiobar-info-container">
    <div class="audiobar-info">
      <h3>track</h3>
      <h4>track name</h4>
    </div>
  </div>
  <div class="audiobar-controls-container">
    <div class="audiobar-controls">
      <button ion-button icon-only clear>
        <ion-icon name="play"></ion-icon>
      </button>
    </div>
  </div>
</div>
  `,
  styles: [`
  .audiobar-image {
    display: table-cell;
    vertical-align: top;
    position: relative;
    width: 60px;
  }

  .audiobar-image img {
    height: 60px;
    width: 60px;
  }

  .audiobar-layout .audiobar-info-container {
    display: table-cell;
    vertical-align: top;
    position: relative;
  }

  .audiobar-info-conatiner .audiobar-info {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    padding: 13px 15px;
  }

  .audiobar-info h3 {
    font-size: 1.2em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .audiobar-info h4 {
    font-size: 1.1em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.1em;
  }

  .audiobar-layout .audiobar-controls-container {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    width: 1%;
  }

  .audiobar-controls-container .audiobar-controls {
    white-space: nowrap;
  }

  .audiobar-controls button {
    border: 0;
    background: transparent;
    margin-right: 15px;
    outline: none;
    height: 44px;
    width: 44px;
  }

  button ion-spinner {
    width: 44px;
    height: 44px;
  }

  .audiobar-layout {
    display: table;
  }
  .elapsed-container {
    position: relative;
    height: 3px;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .percent-elapsed {
    position: absolute;
    line-height: 3px;
    height: 3px;
    background-color: black;
  }
  .percent-loaded {
    position: absolute;
    line-height: 3px;
    height: 3px;
    background-color: rgba(0,0,0,0.4);
  }
  `]
})
export class AudioPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
