import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Track } from './track.model';
import 'rxjs/add/operator/map';


@Injectable()
export class PlaylistService {
    public playlist: BehaviorSubject<Track[]> = new BehaviorSubject(null);

    constructor() {}

    public getPlaylist(): Observable<Track[]> {
        return this.playlist.asObservable();
    }

    public setPlaylist(playlist: Track[]): void {
        this.playlist.next(playlist);
    }

        // TODO: Refactor to playlist service
    public playNextTrack = () => {
        // let finished;
        // let tracks;
        // this.getCurrentTrack().subscribe(track => finished = track);

        // this.playlistService.getPlaylist().subscribe(playlist => tracks = playlist);
        // if(finished.index + 1 !== tracks.length) {
        //     this.setCurrentTrack(tracks[finished.index + 1])
        // } else {
        //     // stop audio
        // }
    }

}