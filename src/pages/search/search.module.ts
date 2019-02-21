import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import {DirectivesModule} from "../../directives/directives.module";

import { SearchPage } from './search';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    TranslateModule.forChild(),
    DirectivesModule
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule { }
