import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import * as _ from 'lodash';
import { ApisService } from 'src/app/services/apis/apis.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public audioName: string;

  constructor(
    private navParams: NavParams,
    private storage: StorageService,
    private apiService: ApisService,
    private popoverCtrl: PopoverController
  ) {
    this.audioName = this.navParams.get('name');
  }

  ngOnInit() {}

  deleteAudio() {
    this.storage.getObject('audioFiles')
      .then((res: any) => {
        let audios = res || [];
        var that = this;
        this.apiService.audioFiles = _.remove(audios, function(audio) {
          return audio.name != that.audioName;
        });
        this.storage.setObject('audioFiles', this.apiService.audioFiles);
        this.popoverCtrl.dismiss();
      })
      .catch(e => { console.log(e); });
  }

}
