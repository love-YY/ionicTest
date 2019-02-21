import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import {DirectivesModule} from "../../directives/directives.module";

import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild(),
    DirectivesModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule { }
