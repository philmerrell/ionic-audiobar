import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output, HostListener } from '@angular/core';
import { Track } from './track.model';
import { PlaylistService } from './services/playlist.service';
import { ModalController } from '@ionic/angular';
import { AudioPlayerDetailModalComponent } from './audio-player-detail-modal/audio-player-detail-modal.component';


@Component({
  selector: 'ial-ionic-audiobar',
  template: `
    <div ialAudioBarPosition [offset]="offset" class="audiobar">
      <ial-audio-player [track]="currentTrack" (ended)="getNextTrack($event)"></ial-audio-player>
    </div>
  `,
  styles: [`
    .audiobar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      padding: 0;
      background: #f7f7f7;
    }
  `]
})
export class IonicAudiobarComponent implements OnInit, OnChanges {

  @Input() playlist: Track[];
  @Input() offset;
  @Output() trackChange: EventEmitter<Track> = new EventEmitter();
  currentTrack: Track;

  constructor(
    private playlistService: PlaylistService,
    private modal: ModalController) { }

    @HostListener('click') togglePlayerVisibility() {
      this.presentModal().then(() => {
        console.log('present');
      });
    }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const changedPlaylist = changes['playlist'].currentValue;
    if (changedPlaylist) {
      this.playlistService.setPlaylist(changedPlaylist);
      this.setCurrentTrack(changedPlaylist[0]);
    }
  }

  private setCurrentTrack(track) {
    if (track) {
      this.currentTrack = track;
      this.trackChange.emit(track);
    }
  }

  private getNextTrack() {
    const index = this.playlist.findIndex(track => track === this.currentTrack);
    const nextTrack = this.playlist[index + 1];
    this.setCurrentTrack(nextTrack);
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: AudioPlayerDetailModalComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
