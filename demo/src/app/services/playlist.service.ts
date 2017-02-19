import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Track } from 'ionic-audiobar';
import 'rxjs/add/operator/map';


@Injectable()
export class PlaylistService {
    public playlistSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private playlist = [];

    constructor() {
      this.playlistSubject.next([]);
    }

    public getPlaylist(): Observable<any[]> {
      return this.playlistSubject.asObservable();
    }

    public setPlaylist(playlist: any[]): void {
      this.playlist = playlist;
      this.playlistSubject.next(this.playlist);
    }

    public addTrackToPlaylist(track) {
      this.playlist.push(track);
      this.playlistSubject.next(this.playlist);
    }

}