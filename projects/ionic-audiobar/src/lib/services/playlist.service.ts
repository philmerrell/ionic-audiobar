import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../track.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistSubject: BehaviorSubject<Track[]> = new BehaviorSubject([]);
  private playlist = [];
  private currentTrackSubject: BehaviorSubject<Track> = new BehaviorSubject({} as Track);
  private currentTrack;


  constructor() { }

  public getPlaylist(): Observable<Track[]> {
    return this.playlistSubject.asObservable();
  }

  public setPlaylist(playlist: Track[]): void {
    this.playlist = playlist;
    this.playlistSubject.next(this.playlist);
  }

  public getCurrentTrack(): Observable<Track> {
    return this.currentTrackSubject.asObservable();
  }

  public setCurrentTrack(track: Track): void {
    this.currentTrack = track;
    this.currentTrackSubject.next(this.currentTrack);
  }

  public remove(track: Track): void {
    const index = this.playlist.indexOf(track);

    if (index > -1) {
      this.playlist.splice(index, 1);
    }
  }

  public nextTrack(track) {
    const currentTrackIndex = this.playlist.indexOf(track);
    if (currentTrackIndex + 1 !== this.playlist.length) {
      this.setCurrentTrack(this.playlist[currentTrackIndex + 1]);
    } else {
        // stop audio
    }

  }

  // public addTrackToPlaylist(track: Track): void {
  //   this.playlist.push(track);
  //   this.playlistSubject.next(this.playlist);
  // }
}
