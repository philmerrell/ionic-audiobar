import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../track.model';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistSubject: BehaviorSubject<Track[]> = new BehaviorSubject([]);
  private playlist = [];
  private currentTrack: Track;

  constructor(private audioService: AudioService) {
    this.subscribeToCurrentTrack();
  }

  public subscribeToCurrentTrack() {
    this.audioService.getCurrentTrack()
      .subscribe(track => this.currentTrack = track);
  }

  public getPlaylist(): Observable<Track[]> {
    return this.playlistSubject.asObservable();
  }

  public setPlaylist(playlist: Track[]): void {
    this.playlist = playlist;
    this.playlistSubject.next(this.playlist);
  }

  public remove(track: Track): void {
    const index = this.playlist.indexOf(track);

    if (index > -1) {
      this.playlist.splice(index, 1);
    }
  }

  public nextTrack(): void {
    const currentTrackIndex = this.playlist.indexOf(this.currentTrack);

    if (currentTrackIndex + 1 !== this.playlist.length) {
      // We are still in bounds of the playlist
      this.audioService.setCurrentTrack(this.playlist[currentTrackIndex + 1]);
    } else {
      // nextTrack was called on the last track so start the playlist over
      this.audioService.setCurrentTrack(this.playlist[0]);
      // this.audioService.pauseAudio();
    }

  }

  public previousTrack(): void {
    const currentTrackIndex = this.playlist.indexOf(this.currentTrack);

    if (currentTrackIndex === 0) {
      this.audioService.setCurrentTrack(this.playlist[0]);
    } else {
      this.audioService.setCurrentTrack(this.playlist[currentTrackIndex - 1]);
    }
  }

  // public addTrackToPlaylist(track: Track): void {
  //   this.playlist.push(track);
  //   this.playlistSubject.next(this.playlist);
  // }
}
