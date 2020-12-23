import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Plugins, CameraResultType } from '@capacitor/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PopoverComponent } from './popover/popover.component';
import { ApisService } from 'src/app/services/apis/apis.service';
const { Camera } = Plugins;
import * as moment from 'moment';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  constructor(
    private storage: StorageService,
    private popoverCtrl: PopoverController,
    public apiService: ApisService
  ) { }

  ngOnInit() {
    this.storage.getObject('photos')
      .then((res: any) => {
        this.apiService.photos = res || [];
      })
      .catch(e => { console.log(e); });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    this.storePhotoFile(image);
  }

  storePhotoFile(image) {
    let photoObj = {
      name: 'Billede ' + moment().format('YYYY-MM-DD HH:mm:ss'),
      data: image.dataUrl,
      geoTag: {}
    };
    this.storage.getObject('photos')
      .then((res: any) => {
        this.apiService.photos = res || [];
        this.apiService.photos.unshift(photoObj);
        this.storage.setObject('photos', this.apiService.photos);
      })
      .catch(e => { console.log(e); });
  }

  async presentPopover(ev: any, photoName) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: { name: photoName }
    });
    return await popover.present();
  }
}
