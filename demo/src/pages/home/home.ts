import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Track } from 'ionic-audiobar';
import { SoundCloudService } from '../../app/services/sound-cloud.service';
import { PlaylistService } from '../../app/services/playlist.service';

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

  constructor(public navCtrl: NavController, private soundCloud: SoundCloudService, private playlistService: PlaylistService) {
    this.initializeSoundCloud();
    this.getPlaylist();
  }

  addToPlaylist(SCResult) {
    let mp3Url = SCResult.stream_url + '?client_id=' + this.soundCloud.getApiKey();
    let user = SCResult.user.username;
    let title = SCResult.title;
    let image = this.soundCloud.getLargeImage(SCResult.artwork_url);

    let track = new Track(mp3Url, user, title, image);
    this.playlistService.addTrackToPlaylist(track);
  }

  getPlaylist() {
    // this.playlistService.getPlaylist()
    //   .subscribe(playlist => {
    //     this.myPlaylist = playlist;
    //     console.log(this.myPlaylist);
    //   });
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
      track.artwork_url = this.soundCloud.getBadgeImage(track.artwork_url);
      this.soundCloudResults.push(track);
    }
  }
}
