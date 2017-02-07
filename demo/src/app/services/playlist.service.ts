import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Track } from 'ionic-audiobar';
import 'rxjs/add/operator/map';


@Injectable()
export class PlaylistService {
    public playlist: BehaviorSubject<any[]> = new BehaviorSubject(
      new Track('https://api.soundcloud.com/tracks/62188129/stream?client_id=df942240e3e63f8e23596df0893eab2a',
                'Mac Demarco', 
                'Ode to Viceroy', 
                'https://i1.sndcdn.com/artworks-000031540797-8io3vh-t500x500.jpg'));

    constructor() {}

    public getPlaylist(): Observable<any[]> {
        return this.playlist.asObservable();
    }

    public setPlaylist(playlist: any[]): void {
        this.playlist.next(playlist);
    }

}