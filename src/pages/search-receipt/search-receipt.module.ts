import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchReceiptPage } from './search-receipt';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    SearchReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchReceiptPage),
    PipesModule
  ],
})
export class SearchReceiptPageModule {}
