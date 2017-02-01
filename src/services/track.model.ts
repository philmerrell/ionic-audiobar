// import * as moment from 'moment';

export class Track {
    audioUrl: string;
    image: string;
    artist: string;
    song: string;
    index: number;

    constructor(url: string, artist: string, song: string, image: string) {
        this.audioUrl = url;
        this.image = image;
        this.artist = artist;
        this.song = song;
    }

}
