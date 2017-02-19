import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Track } from './track.model';
import 'rxjs/add/operator/map';


@Injectable()
export class PlaylistService {
    public playlistSubject: BehaviorSubject<Track[]> = new BehaviorSubject([]);
    private playlist = [];

    constructor() {}

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