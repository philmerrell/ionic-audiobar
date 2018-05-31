import { NgModule } from '@angular/core';
import { IonicAudiobarComponent } from './ionic-audiobar.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { AudioPlayerDetailComponent } from './audio-player-detail/audio-player-detail.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [IonicAudiobarComponent, AudioPlayerComponent, AudioPlayerDetailComponent],
  exports: [IonicAudiobarComponent]
})
export class IonicAudiobarModule { }
