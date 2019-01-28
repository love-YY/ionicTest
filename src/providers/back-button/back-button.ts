import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Platform,App,NavController,Tabs,ToastController} from "ionic-angular";
import { AppMinimize } from '@ionic-native/app-minimize'
/*
  Generated class for the BackButtonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackButtonProvider {
  //控制硬件返回按钮是否触发，默认false
  backButtonPressed: boolean = false;

  constructor(
    public http: HttpClient,
    public platform:Platform,
    public toastCtrl:ToastController,
    public appCtrl:App,
    public appMinimize:AppMinimize
  ) {
    console.log('Hello BackButtonProvider Provider');
  }

  //注册方法
  registerBackButtonAction(tabRef: Tabs): void {

    //registerBackButtonAction是系统自带的方法
    this.platform.registerBackButtonAction(() => {
      //获取NavController
      let activeNav: NavController = this.appCtrl.getActiveNav();
      /*console.log(this.appCtrl.getActiveNav());
      console.log(this.appCtrl.getActiveNavs());*/

      // 有博主说上面的方法在新的版本中被移除，但是我在测试的时候还可以继续使用，下面这段代码是新的使用方式，我也贴出来。
      // let activeNav: NavController = this.appCtrl.getActiveNavs()[0];
      // let modalProtal = this.appCtrl.
      //如果可以返回上一页，则执行pop
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        if (tabRef == null || tabRef._selectHistory[tabRef._selectHistory.length - 1] === tabRef.getByIndex(0).id) {
          //执行退出
          this.showExit();
        } else {
          //选择首页第一个的标签(根据自己的业务需求定制吧)
          tabRef.select(0);
        }
      }
    });
  }

  //退出应用方法
  private showExit(): void {
    //如果为true，退出application
    /*if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      //第一次按，弹出Toast
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      //标记为true
      this.backButtonPressed = true;
      //两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }*/
    //最小化application
    this.appMinimize.minimize();
  }
}
