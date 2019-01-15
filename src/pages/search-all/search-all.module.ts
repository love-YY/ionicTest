import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchAllPage } from './search-all';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SearchAllPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SearchAllPage),
  ],
})
export class SearchAllPageModule {}
