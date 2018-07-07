import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeElapsed'
})
export class TimeElapsedPipe implements PipeTransform {

  transform(currentTime: number): string {

    const seconds = Math.floor(currentTime % 60),
      displaySecs = (seconds < 10) ? '0' + seconds : seconds,
      minutes     = Math.floor((currentTime / 60) % 60),
      displayMins = (minutes < 10) ? '0' + minutes : minutes;

    return displayMins + ':' + displaySecs;
  }

}
