import { Injectable } from '@angular/core';
import { Track } from '../track.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public audio: HTMLAudioElement;
  public currentTrack: BehaviorSubject<Track> = new BehaviorSubject({} as Track);
  public percentElapsed: BehaviorSubject<number> = new BehaviorSubject(0);
  public percentLoaded: BehaviorSubject<number> = new BehaviorSubject(0);
  public playerStatus: BehaviorSubject<string> = new BehaviorSubject('paused');

  constructor() {
    this.audio = new Audio();
    this.attachListeners();
  }

  private attachListeners(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('progress', this.calculatePercentLoaded, false);
    this.audio.addEventListener('waiting', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private calculateTime = (evt) => {
    const ct = this.audio.currentTime;
    const d = this.audio.duration;
    this.setPercentElapsed(d, ct);
  }

  private calculatePercentLoaded = (evt) => {
    try {
      const b = this.audio.buffered.end(0);
      const d = this.audio.duration;
      const percent = ((b / d) * 100);
      this.setPercentLoaded(percent);
    } catch (err) {
      this.setPercentLoaded(0);
    }
  }

  private setPlayerStatus = (evt) => {
    switch (evt.type) {
      case 'playing':
        this.playerStatus.next('playing');
        break;
      case 'pause':
        this.playerStatus.next('paused');
        break;
      case 'waiting':
        this.playerStatus.next('loading');
        break;
      case 'ended':
        this.playerStatus.next('ended');
        break;
      default:
        this.playerStatus.next('paused');
        break;
    }
  }

  public getCalculatedSeekTime(value): number {
    const duration = this.getAudioElement().duration;
    return value * duration / 100;
  }

  public getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  public setAudio(src: string): void {
    this.audio.src = src;
    this.playAudio();
  }

  public playAudio(): void {

    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
  }

  public pauseAudio(): void {
    this.audio.pause();
  }

  public seekAudio(position: number): void {
    this.audio.currentTime = position;
  }

  public getCurrentTrack(): Observable<Track> {
    return this.currentTrack.asObservable();
  }

  public setCurrentTrack(track: Track): void {
    if (track) {
      this.setAudio(track.audioUrl);
      this.currentTrack.next(track);
    }

  }

  private setPercentElapsed(d: number, ct: number): void {
    this.percentElapsed.next((Math.floor((100 / d) * ct)) || 0);
  }

  private setPercentLoaded(p): void {
    this.percentLoaded.next(parseInt(p, 10) || 0);
  }

  public getPercentLoaded(): Observable<number> {
    return this.percentLoaded.asObservable();
  }

  public getPercentElapsed(): Observable<number> {
    return this.percentElapsed.asObservable();
  }

  public getPlayerStatus(): Observable<string> {
    return this.playerStatus.asObservable();
  }

  public toggleAudio(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }
}
