// import * as moment from 'moment';

export class Track {
    audioUrl: string;
    image: string;
    artist: string;
    song: string;
    index: number;

    constructor(url, artist, song, image) {
        this.audioUrl = url;
        this.image = image;
        this.artist = artist;
        this.song = song;
    }

}
