import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis/apis.service';
import { LoadingController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public photoCount: number;
  public audioCount: number;

  constructor(
    public apiService: ApisService,
    private loadingCtrl: LoadingController,
    private storage: StorageService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.getPhotoCount();
    this.getAudioCount();
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();
    this.apiService.getData()
      .then(res => {
        loading.dismiss();
        this.apiService.apiData = res;
        this.storage.setObject('apidata', res);
      })
      .catch(e => console.log(e));
  }

  getPhotoCount() {
    this.storage.getObject('photos')
      .then((res: any) => {
        let photos = res || [];
        this.photoCount = photos.length;
      })
      .catch(e => { console.log(e); });
  }

  getAudioCount() {
    this.storage.getObject('audioFiles')
      .then((res: any) => {
        let audios = res || [];
        this.audioCount = audios.length;
      })
      .catch(e => { console.log(e); });
  }

  goPhotosPage() {
    this.navCtrl.navigateForward('photos');
  }

  goAudioPage() {
    this.navCtrl.navigateForward('audio');
  }
}
