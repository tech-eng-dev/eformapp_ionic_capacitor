import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ApisService } from 'src/app/services/apis/apis.service';
import { PopoverController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import * as moment from 'moment';
import { Capacitor } from '@capacitor/core';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {
  @ViewChild('myAudio') myAudio: any;
  public audoFilePath: string;
  public curAudioName: string;
  public duration;

  constructor(
    private mediaCapture: MediaCapture,
    private storage: StorageService,
    public apiService: ApisService,
    private popoverCtrl: PopoverController,
    private file: File,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.storage.getObject('audioFiles')
      .then((res: any) => {
        this.apiService.audioFiles = res || [];
      })
      .catch(e => { console.log(e); });
  }

  takeAudio() {
    let options: CaptureAudioOptions = { limit: 1 };
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => {
          let capturedFile = data[0];
          let fileName = capturedFile.name;
          let dir = capturedFile['localURL'].split('/');
          dir.pop();
          let fromDirectory = dir.join('/');      
          var toDirectory = this.file.dataDirectory;
          this.file.copyFile(fromDirectory , fileName , toDirectory , fileName)
            .then((res) => {
              this.storeMediaFile(capturedFile);
            })
            .catch(err => {
              console.log('err--------: ', err);
            });
        },
        (err: CaptureError) => { 
          console.log('error BBB: ', err);
        }
      );
  }

  storeMediaFile(audio: MediaFile) {
    audio.getFormatData(
      (res) => {
        this.zone.run(() => {
          this.duration = moment.utc(moment.duration(res.duration, 'seconds').as('milliseconds')).format('HH:mm:ss');
          this.storage.getObject('audioFiles')
            .then((res: any) => {
              let audioObj = {
                name: 'Lydoptagelse ' + moment().format('YYYY-MM-DD HH:mm:ss'),
                realName: audio.name,
                duration: this.duration
              };
              this.apiService.audioFiles = res || [];
              this.apiService.audioFiles.unshift(audioObj);
              this.storage.setObject('audioFiles', this.apiService.audioFiles);
            })
            .catch(e => { console.log(e); });
        });
      },
      (e) => {
        console.log(e);
      });
  }

  play(audio) {
    this.curAudioName = audio.name;
    let path = this.file.dataDirectory + audio.realName;
    let url = Capacitor.convertFileSrc(path);
    let audioPlayer = this.myAudio.nativeElement;
    audioPlayer.src = url;
    audioPlayer.play();
  }

  async presentPopover(ev: any, audioName) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: { name: audioName}
    });
    return await popover.present();
  }
}
