# Ionic Audiobar

*This component is in the early stages of development and not recommended for use in a production application.*


This component is derived from the UX pattern found in music applications such as Apple Music and Google Play Music.
It exposes an, "Audiobar" (think Navbar and Tabbar) that when interacted with exposes a detail view of the 
track currently playing.

This component's responsibility is to simply consume a list of tracks, i.e., a playlist.  A playlist is passed to
the component through an attribute 

`<audiobar playlist="myPlaylist"></audiobar>`

The audiobar's was designed to allow the user to play and navigate through a list of tracks that are passed to it.
It will be up to the developer to manage multiple playlists.


## Installation
`npm install ionic-audiobar`

## Usage
In most cases you'll want to use the Audiobar on your top level view so that it stays persistent across all views 
in your application.

home.ts
```
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Track } from 'ionic-audiobar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myPlaylist = [
      new Track('https://api.soundcloud.com/tracks/62188129/stream?client_id=df942240e3e63f8e23596df0893eab2a', 
                'Mac Demarco',
                'Ode to Viceroy',
                'https://i1.sndcdn.com/artworks-000031540797-8io3vh-t500x500.jpg')
    ];
  constructor(public navCtrl: NavController) {}

}
```

home.html

```
<ion-header>
  <ion-navbar>
    <ion-title>Home</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <h2>Welcome to Ionic!</h2>
</ion-content>
<audiobar [playlist]="myPlaylist"></audiobar>

```