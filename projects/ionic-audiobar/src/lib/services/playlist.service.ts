import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../track.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public playlistSubject: BehaviorSubject<Track[]> = new BehaviorSubject([]);
  private playlist = [];

  constructor() { }

  public getPlaylist(): Observable<Track[]> {
    return this.playlistSubject.asObservable();
  }

  public setPlaylist(playlist: Track[]): void {
    this.playlist = playlist;
    this.playlistSubject.next(this.playlist);
  }

  public addTrackToPlaylist(track: Track): void {
    this.playlist.push(track);
    this.playlistSubject.next(this.playlist);
  }
}
