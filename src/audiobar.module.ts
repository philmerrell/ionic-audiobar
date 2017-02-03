import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudiobarComponent } from './audiobar.component';
import { PlayerComponent } from './player/player.component';
import { AudioService } from './services/audio.service';
import { PlaylistService } from './services/playlist.service';
import { PlayerPositionService } from './services/player-position.service';
import { IonicModule } from 'ionic-angular';

// TODO: Research if we can import only the Ionic components used rather than entire module

@NgModule({
  declarations: [
    AudiobarComponent,
    PlayerComponent
  ],
  exports: [
    AudiobarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [ AudioService, PlaylistService, PlayerPositionService ]
})
export class AudiobarModule {}
export * from './services/track.model';
