import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AudiobarModule } from '../../node_modules/ionic-audiobar/dist/audiobar.module';

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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
