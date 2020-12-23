import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DbService } from './services/db/db.service';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'cog'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbService: DbService,
    private storage: StorageService
  ) {
    this.initializeApp();
    this.initAppearance();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      try {
        this.dbService.creatTbls().subscribe(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          },
          () => {}
        );
      } catch (error) {
        console.log(error);
      }
    });
  }

  initAppearance() {
    this.storage.getObject('settings')
      .then(res => {
        if(res) this.storage.darkMode = res['darkMode'];
        document.body.classList.toggle('dark', this.storage.darkMode);
      });
  }

  ngOnInit() {
    const path = window.location.pathname.split('/dashboard')[0];
    if (path == '') {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
