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
import { PlaylistComponent } from './playlist/playlist.component';
import { FormsModule } from '@angular/forms';
import { PlaylistSlidesComponent } from './playlist-slides/playlist-slides.component';
import { TimeElapsedPipe } from './pipes/time-elapsed.pipe';
import { TimeRemainingPipe } from './pipes/time-remaining.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    IonicAudiobarComponent,
    AudioPlayerComponent,
    AudioPlayerDetailComponent,
    AudioBarPositionDirective,
    AudioPlayerDetailModalComponent,
    PlaylistComponent,
    PlaylistSlidesComponent,
    TimeElapsedPipe,
    TimeRemainingPipe
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
