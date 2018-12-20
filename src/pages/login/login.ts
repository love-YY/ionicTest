import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

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
    loginName: 'admin',
    pwd: 'admin'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public setting:Settings,
    public storage:Storage
    ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp:any) => {
      console.log(resp);
      if(resp.errtype=='S'){
        this.storage.set('user',resp.data).then((res)=>{
          console.log(res);
        });
        this.navCtrl.push(MainPage);
      }else if(resp.errtype=='I'){
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
