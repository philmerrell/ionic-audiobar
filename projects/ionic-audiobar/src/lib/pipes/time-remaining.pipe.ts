import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemaining'
})
export class TimeRemainingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
