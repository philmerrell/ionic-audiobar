import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Track } from 'ionic-audiobar';
import { SoundCloudService } from '../../app/services/sound-cloud.service';

declare var SC: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myPlaylist = [
      new Track('https://api.soundcloud.com/tracks/62188129/stream?client_id=df942240e3e63f8e23596df0893eab2a',
                'Mac Demarco', 
                'Ode to Viceroy', 
                'https://i1.sndcdn.com/artworks-000031540797-8io3vh-t500x500.jpg')];

  public soundCloudResults = [];

  constructor(public navCtrl: NavController, private soundCloud: SoundCloudService) {
    this.initializeSoundCloud();
  }

  initializeSoundCloud() {
    SC.initialize({
      client_id: this.soundCloud.getApiKey()
    });
  }

  searchSoundCloud(ev) {
    SC.get('/tracks', { q: ev.target.value })
      .then((tracks) => {
        this.extractTracks(tracks);
      });
  }

  extractTracks(tracks) {
    this.soundCloudResults = [];
    for (let track of tracks) {
      let mp3Url = track.stream_url + '?client_id=' + this.soundCloud.getApiKey();
      track.artwork_url = this.soundCloud.getBadgeImage(track.artwork_url);
      this.soundCloudResults.push(track);
    }
  }
}
