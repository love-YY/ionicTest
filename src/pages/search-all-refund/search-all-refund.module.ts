import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchAllRefundPage } from './search-all-refund';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    SearchAllRefundPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchAllRefundPage),
    PipesModule
  ],
})
export class SearchAllRefundPageModule {}
