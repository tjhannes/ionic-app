import { Component, OnInit } from '@angular/core';
import { Howl, Howler } from 'howler';
import { MusicPlayerComponent } from '../../shared/music-player/music-player.component';
import { ModalController } from '@ionic/angular';
import { interval, Subscription, Observable } from 'rxjs';

import { MusicController, PlayerEventOptions, initialPlayerEventOptions } from '../../shared/music-controller/music-controller.service';
import { Store, select } from '@ngrx/store';
import { actionMusicSetPlaying } from '../../shared/music/music.actions';
import { selectMusic } from '../../shared/music/music.selectors';
import { StateMusic, MusicState } from '../../shared/music/music.model';
import { initialStateMusic } from '../../shared/music/music.reducer';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {

  audioDuration = 0;
  audioCurrentPosition = 0;
  audioCheckInterval = interval(200);

  showBar: boolean = true;

  player: Howl = null;
  isPlaying = false;
  progress = 0;
  music: PlayerEventOptions = initialPlayerEventOptions;

  audioSubscription: Subscription = new Subscription;

  stories: any[] = [];

  musics: any[] = [
    { id: '6545421321', author: 'Silent Partner', song: 'Blue Skies', image: '../../assets/musics/img/6545421321.jpg' },
    { id: '7854235678', author: 'Kevin MacLeod', song: 'Life of Riley', image: '../../assets/musics/img/7854235678.jpg'},
    { id: '5612785349', author: 'Kevin MacLeod', song: 'Sneaky Snitch', image: '../../assets/musics/img/5612785349.jpg' }
  ];

  constructor(
    private modalController: ModalController,
    private musicController: MusicController,
    private store: Store
  ) { }

  playMusic(id: String) {
    var i;
    for (i=0; i<this.musics.length; i++){
      if (this.musics[i].id == id){
        this.musicController.playMusic(this.musics[i]);
      }
    }
  }


  toggleMusic() {
    this.musicController.togglePlayer(this.music.isPlaying, (this.music.seek / this.music.duration) * 100);
  }

  closePlayer() {
    this.musicController.abort();
  }

  nextMusic() { }

  prevMusic() { }

  seekMusic() { }

  updateProgressMusic() { }

  async openMusicModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const modal = await this.modalController.create({
      component: MusicPlayerComponent,
      cssClass: 'music-modal',
      swipeToClose: true,
      componentProps: {
        music: this.music
      }
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  ngOnInit(): void {
    this.musicController.onProgress.subscribe((res) => {
      this.music = { ...this.music, ...res };
      this.progress = +(this.music.seek / this.music.duration);
    });
  }

  

}
