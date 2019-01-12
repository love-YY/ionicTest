import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,LoadingController } from 'ionic-angular';

import { User,Settings } from '../../providers';
import { MainPage } from '../';
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles:[`.error{background: #f00}`]
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { loginName: string, pwd: string } = {
    loginName: 'R20190104',
    pwd: 'R20190104'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public setting:Settings,
    public storage:Storage,
    public loadingCtrl:LoadingController
    ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({
      content:'登陆中...',
      duration:5000
    });
    loading.present();
    this.user.login(this.account).subscribe((resp:any) => {
      console.log(resp);
      loading.dismiss();
      if(resp.errtype=='S'){
        this.storage.set('user',resp.data).then((res)=>{
          console.log(res);
        });
        // this.navCtrl.push(MainPage);
        this.navCtrl.setRoot(MainPage,{},{
          animate: true,
          direction: 'forward'
        });
      }else {
        let toast = this.toastCtrl.create({
          message: resp.errmsg,
          duration: 3000,
          position: 'top',
          cssClass:'error'
        });
        toast.present();
      }

    }, (err) => {
      // this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
