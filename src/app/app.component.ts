import { Component } from '@angular/core';
import { Track } from 'dist/ionic-audiobar/lib/track.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myPlaylist = [
    {
      audioUrl: 'https://cpa.ds.npr.org/idaho/audio/2017/10/102317_EarlyVoting_JD.mp3',
      artist: 'Boise State Public Radio',
      song: 'Early Voting Begins Today In Ada, Canyon Counties',
      image: 'http://mediad.publicbroadcasting.net/p/idaho/files/styles/medium/public/election_primary_may_2012_007.jpg'
    } as Track,
    {
      audioUrl: 'https://cpa.ds.npr.org/idaho/audio/2017/10/102317_ElkFeeding_MG.mp3',
      artist: 'Boise State Public Radio',
      song: 'Blaine County Considering Ordinance Banning Feeding Famished Wildlife',
      image: 'http://mediad.publicbroadcasting.net/p/idaho/files/styles/large/public/201701/ap_elk_keith_kohl.jpg'
    } as Track
  ];
  title = 'app';
}
