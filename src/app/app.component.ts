import { Component } from '@angular/core';
import { Track } from 'dist/ionic-audiobar/lib/track.model';
import { NprService } from './npr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playlist$: Observable<Track[]>;
  title = 'app';

  constructor(private nprService: NprService) {
    this.playlist$ = this.nprService.getLocalStories();
  }


}
