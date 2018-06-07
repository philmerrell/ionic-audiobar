import { NgModule } from '@angular/core';
import { IonicAudiobarComponent } from './ionic-audiobar.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { AudioPlayerDetailComponent } from './audio-player-detail/audio-player-detail.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AudioService } from './services/audio.service';
import { PlaylistService } from './services/playlist.service';
import { AudioBarPositionDirective } from './audio-bar-position.directive';
import { AudioPlayerDetailModalComponent } from './audio-player-detail-modal/audio-player-detail-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
    IonicAudiobarComponent,
    AudioPlayerComponent,
    AudioPlayerDetailComponent,
    AudioBarPositionDirective,
    AudioPlayerDetailModalComponent
  ],
  exports: [ IonicAudiobarComponent ],
  providers: [
    AudioService,
    PlaylistService
  ],
  entryComponents: [
    AudioPlayerDetailModalComponent,
    AudioPlayerDetailComponent
  ]
})
export class IonicAudiobarModule { }
