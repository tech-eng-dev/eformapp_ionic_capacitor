import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis/apis.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public deviceInfo: any;
  public vibrate: boolean = false;
  public maxImgQuality: boolean = false;
  public autoGeoTag: boolean = false;
  public scheduleIds: boolean = false;
  public darkMode: boolean = false;

  constructor(
    public apiService: ApisService,
    private storage: StorageService,
    private navCtrl: NavController
  ) {
    
  }

  ngOnInit() {
    this.getDeviceInfo();
    this.getSettings();
  }

  async getDeviceInfo() {
    this.deviceInfo = await Device.getInfo();
  }

  setSettings() {
    let settingsObj = {
      vibrate: this.vibrate,
      maxImgQuality: this.maxImgQuality,
      autoGeoTag: this.autoGeoTag,
      scheduleIds: this.scheduleIds,
      darkMode: this.darkMode
    };
    this.storage.setObject('settings', settingsObj);
    this.storage.darkMode = this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

  getSettings() {
    this.storage.getObject('settings')
      .then(res => {
        if(res) {
          this.vibrate = res['vibrate'];
          this.maxImgQuality = res['maxImgQuality'];
          this.autoGeoTag = res['autoGeoTag'];
          this.scheduleIds = res['scheduleIds'];
          this.darkMode = res['darkMode'];
        }
      })
      .catch(e => console.log(e));
  }

  clearToken() {
    this.storage.removeItem('token');
    this.storage.removeItem('settings');
    this.storage.removeItem('apidata')
      .then(res => {
        document.body.classList.toggle('dark', false);
        this.navCtrl.navigateRoot('dashboard');
      })
      .catch(e => console.log(e));
  }
}
