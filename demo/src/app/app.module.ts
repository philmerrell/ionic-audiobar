import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AudiobarModule } from 'ionic-audiobar';
import { SoundCloudService } from './services/sound-cloud.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    AudiobarModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [SoundCloudService, {provide: ErrorHandler, useClass: IonicErrorHandler}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
