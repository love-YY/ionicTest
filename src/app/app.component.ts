import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import {Config, Nav, NavController, Platform,IonicApp,App} from 'ionic-angular';

import { LoginPage} from '../pages';
import { Settings } from '../providers';
import {Storage} from "@ionic/storage";
import {AppMinimize} from "@ionic-native/app-minimize";

@Component({
  template: `<!--<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>
  </ion-menu>-->
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }
  ]

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage:Storage,
    private ionicApp:IonicApp,
    private appMinimize:AppMinimize,
    private appCtrl:App
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();

      //registerBackButtonAction是系统自带的方法
      this.platform.registerBackButtonAction(() => {
        //获取NavController
        let activeNav: NavController = this.appCtrl.getActiveNav();
        /*console.log(this.appCtrl.getActiveNav());
        console.log(this.appCtrl.getActiveNavs());*/
        let modal = this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();
        if(modal){
          modal.dismiss();
          return;
        }

        // 有博主说上面的方法在新的版本中被移除，但是我在测试的时候还可以继续使用，下面这段代码是新的使用方式，我也贴出来。
        // let activeNav: NavController = this.appCtrl.getActiveNavs()[0];
        // let modalProtal = this.appCtrl.
        //如果可以返回上一页，则执行pop

        if (activeNav.canGoBack()) {
          activeNav.pop();
        } else {
          /*if (tabRef == null || tabRef._selectHistory[tabRef._selectHistory.length - 1] === tabRef.getByIndex(0).id) {
            //执行退出
            this.showExit();
          } else {
            //选择首页第一个的标签(根据自己的业务需求定制吧)
            tabRef.select(0);
          }*/
          this.showExit();
        }
      });

    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    /*this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });*/
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
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
    // this.platform.exitApp();
  }
}
