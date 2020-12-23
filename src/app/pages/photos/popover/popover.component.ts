import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import * as _ from 'lodash';
import { ApisService } from 'src/app/services/apis/apis.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public photoName: string;
  public currentPhoto = {};
  public geoTag = {};

  constructor(
    private navParams: NavParams,
    private storage: StorageService,
    private apiService: ApisService,
    private popoverCtrl: PopoverController,
    private geolocation: Geolocation,
    private alertCtrl: AlertController
  ) {
    this.photoName = this.navParams.get('name');
    this.storage.getObject('photos')
      .then((res: any) => {
        this.apiService.photos = res || [];
        this.currentPhoto = this.apiService.photos.filter(photo => { return photo.name == this.photoName })[0];
      })
      .catch(e => { console.log(e); });
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.geoTag = resp;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  deletePhoto() {
    var that = this;
    this.apiService.photos = _.remove(this.apiService.photos, function(photo) {
      return photo.name != that.photoName;
    });
    this.storage.setObject('photos', this.apiService.photos);
    this.popoverCtrl.dismiss();
  }

  async geoPhoto() {
    let message: string = '';
    if(typeof this.currentPhoto['geoTag']['timestamp'] != 'undefined') {
      message = 'Do you want to replace current geo tag to this image?';
    } else {
      message = 'Do you want to add new geo tag to this image?';
    }
    const alertDlg = await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.popoverCtrl.dismiss();
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.apiService.photos.map(photo => {
              if(photo.name == this.photoName) {
                photo['geoTag'] = this.geoTag;
                return photo;
              } else {
                return photo;
              }
            });
            this.storage.setObject('photos', this.apiService.photos)
              .then(res => {
                this.popoverCtrl.dismiss();
              })
              .catch(e => {
                console.log(e);
              });
          }
        }
      ]
    });
    await alertDlg.present();
  }
}
