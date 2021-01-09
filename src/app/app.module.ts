import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './shared/shared.state';
import { SettingsEffects } from './shared/settings/settings.effects';
import { MusicEffects } from './shared/music/music.effects';
import { SharedModule } from './shared/shared.module';
import { MusicPlayerComponent } from './shared/music-player/music-player.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicPlayerComponent],
  entryComponents: [
    MusicPlayerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    IonicStorageModule.forRoot(),
    EffectsModule.forRoot([
      SettingsEffects,
      MusicEffects
    ])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
