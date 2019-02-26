import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {MyServiceProvider} from "../../providers";
import {Api} from "../../providers";

/**
 * Generated class for the MoreInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more-info',
  templateUrl: 'more-info.html',
})
export class MoreInfoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myService:MyServiceProvider,
    public app:App,
    public api:Api
  ) {
  }

  ionViewDidLoad() {
  }
  openItem(){
    this.navCtrl.push('ChangePasswordPage');
  }
  logout(){
    this.myService.createLoading({
      content:'注销中...'
    });
    this.api.post('app/user/logout',{})
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          // this.navCtrl.setRoot('LoginPage',{});
          this.app.getRootNav().setRoot('LoginPage');
        }else{
          console.log(res.msg);
        }
      });
  }

}
