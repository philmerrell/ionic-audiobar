import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Track } from 'projects/ionic-audiobar/src/public_api';
@Injectable({
  providedIn: 'root'
})
export class NprService {
  private localUrl = 'http://api.npr.org/query?numresults=7&requiredAssets=image,audio&output=JSON&orgId=26&startDate=2016-06-29&apiKey=MDA1MTkyNjA1MDEyNzM1MTQ0ODk3NTA1NA004';
  private nationalUrl = 'http://player.nprstations.org/scripts/ajax.php?url=http%3A%2F%2Fapi.npr.org%2Fquery%3Fid%3D1002%26numResults%3D10%26requiredAssets%3Daudio%26output%3DJSON%26apiKey%3DMDA1MTkyNjA1MDEyNzM1MTQ0ODk3NTA1NA004';

  constructor(private http: HttpClient) { }

  getLocalStories () {
    return this.http.get(this.localUrl)
    .pipe(map(this.handleResponse));
  }

  getNationalStories () {
    return this.http.get(this.nationalUrl)
      .pipe(map(this.handleResponse));
  }

  private createTrack(story, index) {
    const audio = story.audio[0].format.mp3[0].$text;
    const image = (typeof story.image !== 'undefined') ? story.image[0].src : null;
    const title = story.title.$text;
    const text = story.teaser.$text;
    const dateString = story.storyDate.$text;

    return {
      audioUrl: audio,
      image: image,
      artist: title,
      song: text,
      index: index
    } as Track;
}

private handleResponse = (res) => {
    const stories = res.list.story;
    const trackList = [];
    stories.forEach((story, index) => {
        trackList.push(this.createTrack(story, index));
    });

    return trackList;

}

}
