import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Config } from '@ionic/angular';
import { PlayerEventOptions, initialPlayerEventOptions, MusicController } from '../music-controller/music-controller.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit {
  isIos = false;

  progress: FormControl = new FormControl(0);
  progressTime = '0:00';
  progressTimeEnding = '-0:00'
  volume: FormControl = new FormControl(1);

  music: PlayerEventOptions = initialPlayerEventOptions;

  audioSubscription: Subscription = new Subscription;
  constructor(
    private config: Config,
    private modalCtrl: ModalController,
    private musicController: MusicController
  ) { }

  closeModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  progressChanged() {
    this.musicController.seek(this.progress.value);

    const seek = (+this.progress.value / 100) * this.music.duration;
    this.progressTime = this.musicController.secondsToTime(seek);
    this.progressTimeEnding = '-' + this.musicController.secondsToTime(this.music.duration - seek);
  }

  volumeChanged() {
    const volume = (+this.volume.value / 100);
    this.musicController.volume(volume);
  }

  togglePlayer() {
    this.musicController.togglePlayer(this.music.isPlaying, this.progress.value);
  }

  repeat(repeat: boolean) {
    this.musicController.progress.next({ repeat: !repeat });
  }

  updateMusicValue() {
    this.progress.setValue(((this.music.seek / this.music.duration) * 100).toFixed(0), { emitEvent: false });
    this.progressTime = this.musicController.secondsToTime(this.music.seek);
    this.progressTimeEnding = '-' + this.musicController.secondsToTime(this.music.duration - this.music.seek);
    this.volume.setValue(this.music.volume * 100);
  }

  ngOnInit() {
    this.isIos = this.config.get('mode') === 'ios';
    this.music = this.musicController.getOptions();
    this.updateMusicValue();

    this.audioSubscription.add(
      this.musicController.onProgress.subscribe((res) => {
        this.music = { ...this.music, ...res };
        this.updateMusicValue();
      })
    );
  }

  ngOnDestroy(): void {
    this.audioSubscription.unsubscribe();
  }

}
