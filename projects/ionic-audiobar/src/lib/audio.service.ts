import { Injectable } from '@angular/core';
import { Track } from './track.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public audio: HTMLAudioElement;
  public timeElapsed: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public percentElapsed: BehaviorSubject<number> = new BehaviorSubject(0);
  public percentLoaded: BehaviorSubject<number> = new BehaviorSubject(0);
  public playerStatus: BehaviorSubject<string> = new BehaviorSubject('paused');
  public currentTrack: BehaviorSubject<Track> = new BehaviorSubject({} as Track);

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
    this.setTimeElapsed(ct);
    this.setPercentElapsed(d, ct);
    this.setTimeRemaining(d, ct);
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

  public getAudio(): HTMLAudioElement {
    return this.audio;
  }

  public setAudio(src: string): void {
    this.audio.src = src;
    this.playAudio();
  }

  public playAudio(): void {
    this.audio.play();
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

  private setTimeElapsed(ct: number): void {
    const seconds = Math.floor(ct % 60),
      displaySecs = (seconds < 10) ? '0' + seconds : seconds,
      minutes     = Math.floor((ct / 60) % 60),
      displayMins = (minutes < 10) ? '0' + minutes : minutes;

    this.timeElapsed.next(displayMins + ':' + displaySecs);
  }

  private setTimeRemaining(d: number, t: number): void {
    let remaining;
    const timeLeft = d - t,
      seconds = Math.floor(timeLeft % 60) || 0,
      remainingSeconds = seconds < 10 ? '0' + seconds : seconds,
      minutes = Math.floor((timeLeft / 60) % 60) || 0,
      remainingMinutes = minutes < 10 ? '0' + minutes : minutes,
      hours = Math.floor(((timeLeft / 60) / 60) % 60) || 0;

    if (hours === 0) {
      remaining = '-' + remainingMinutes + ':' + remainingSeconds;
    } else {
      remaining = '-' + hours + ':' + remainingMinutes + ':' + remainingSeconds;
    }
    this.timeRemaining.next(remaining);
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

  public getTimeElapsed(): Observable<string> {
    return this.timeElapsed.asObservable();
  }

  public getTimeRemaining(): Observable<string> {
    return this.timeRemaining.asObservable();
  }

  public getPlayerStatus(): Observable<string> {
    return this.playerStatus.asObservable();
  }

  public toggleAudio(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }
}
