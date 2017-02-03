import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Track } from 'ionic-audiobar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myPlaylist = [
      new Track('https://api.soundcloud.com/tracks/62188129/stream?client_id=df942240e3e63f8e23596df0893eab2a', 'Mac Demarco', 'Ode to Viceroy', 'https://i1.sndcdn.com/artworks-000031540797-8io3vh-t500x500.jpg')
    ];
  constructor(public navCtrl: NavController) {
  
  }

}
