import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchRefundPage } from './search-refund';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    SearchRefundPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchRefundPage),
    PipesModule
  ],
})
export class SearchRefundPageModule {}
