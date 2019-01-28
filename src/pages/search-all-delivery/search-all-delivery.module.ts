import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchAllDeliveryPage } from './search-all-delivery';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    SearchAllDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchAllDeliveryPage),
    PipesModule
  ],
})
export class SearchAllDeliveryPageModule {}
