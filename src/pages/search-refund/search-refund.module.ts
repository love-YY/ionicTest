import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchRefundPage } from './search-refund';

@NgModule({
  declarations: [
    SearchRefundPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchRefundPage),
  ],
})
export class SearchRefundPageModule {}
