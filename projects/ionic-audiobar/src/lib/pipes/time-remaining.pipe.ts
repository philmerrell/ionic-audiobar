import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemaining'
})
export class TimeRemainingPipe implements PipeTransform {

  transform(currentTime: number, duration: number): string {
    let remaining;
    const timeLeft = duration - currentTime,
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

    return remaining;
  }

}
