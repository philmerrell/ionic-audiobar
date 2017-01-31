import { Injectable } from '@angular/core';

declare var window: any;

@Injectable()
export class PlayerPositionService {

  constructor() { }

  getInnerHeight() {
    return window.innerHeight;
  }

}
