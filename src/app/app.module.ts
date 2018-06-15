import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicAudiobarModule } from 'projects/ionic-audiobar/src/public_api';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NprService } from './npr.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicAudiobarModule,
    IonicModule.forRoot()
  ],
  providers: [
    NprService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
