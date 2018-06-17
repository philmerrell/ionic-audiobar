import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output, HostListener } from '@angular/core';
import { Track } from './track.model';
import { PlaylistService } from './services/playlist.service';
import { ModalController } from '@ionic/angular';
import { AudioPlayerDetailModalComponent } from './audio-player-detail-modal/audio-player-detail-modal.component';
import { AudioService } from './services/audio.service';


@Component({
  selector: 'ial-ionic-audiobar',
  template: `
    <div ialAudioBarPosition *ngIf="playlist" [offset]="offset" class="audiobar">
      <ial-audio-player [track]="currentTrack" (ended)="getNextTrack($event)" (open)="togglePlayerVisibility()"></ial-audio-player>
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

  @Input() playlist: Track[] = [];
  @Input() offset;
  @Output() trackChange: EventEmitter<Track> = new EventEmitter();
  currentTrack: Track;

  constructor(
    private playlistService: PlaylistService,
    private audioService: AudioService,
    private modal: ModalController) { }

  ngOnInit() {
    this.getCurrentTrack();
  }

  ngOnChanges(changes: SimpleChanges) {
    const changedPlaylist = changes['playlist'].currentValue;
    if (changedPlaylist) {
      // TODO: allow for setting index of playlist for current track.
      this.playlistService.setPlaylist(changedPlaylist);
      this.setCurrentTrack(changedPlaylist[0]);
    }
  }

  togglePlayerVisibility() {
    this.presentModal().then(() => {
      console.log('present');
    });
  }

  private getCurrentTrack() {
    this.audioService.getCurrentTrack()
      .subscribe(track => this.currentTrack = track);
  }

  private setCurrentTrack(track) {
    if (track) {
      this.audioService.setCurrentTrack(track);
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
      component: AudioPlayerDetailModalComponent
    });
    return await modal.present();
  }

}
