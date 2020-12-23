import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public customer_num: string;
  public opt_code: string;

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  async authorize() {
    const loading = await this.loadingCtrl.create({
      message: 'Authorzing...'
    });
    await loading.present();
    this.authService.authenticate(this.customer_num, this.opt_code)
      .then(res => {
        loading.dismiss();
        this.storage.setString('token', res.token);
        this.authService.isAuthenticated = true;
        this.navCtrl.navigateRoot('dashboard');
      })
      .catch(e => console.log(e));
  }

}
