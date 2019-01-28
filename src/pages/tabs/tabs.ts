import {Component, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,Tabs,Platform } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root ,Tab4Root} from '../';
import {BackButtonProvider} from "../../providers/back-button/back-button";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;

  tab1Title = "我的订单";
  tab2Title = "建单管理 ";
  tab3Title = "退单管理";
  tab4Title = "更多信息";
  @ViewChild('myTabs') tabRef:Tabs;

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService,
    public platform:Platform,
    public backButtom:BackButtonProvider
  ) {
    platform.ready().then(()=>{
      this.backButtom.registerBackButtonAction(this.tabRef);
    })
    /*translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });*/

  }
}
