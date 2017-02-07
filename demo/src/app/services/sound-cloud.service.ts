import { Injectable } from '@angular/core';

@Injectable()
export class SoundCloudService {

  constructor() { }

  getApiKey() {
    return 'df942240e3e63f8e23596df0893eab2a';
  }

  getLargeImage(url: string) {
    if (url) {
      let image = url.replace('-large', '-t500x500');
      return image;
    } else {
      // TODO: return some default image... 
      return null;
    }
  }

  getBadgeImage(url: string) {
    if (url) {
      let image = url.replace('-large', '-badge');
      return image;
    } else {
      return 'http://www.djwordy.com/wp-content/uploads/images/soundcloud.jpg';
    }
  }

}