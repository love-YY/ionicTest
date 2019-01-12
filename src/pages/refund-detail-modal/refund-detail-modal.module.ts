import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefundDetailModalPage } from './refund-detail-modal';

@NgModule({
  declarations: [
    RefundDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RefundDetailModalPage),
  ],
})
export class RefundDetailModalPageModule {}
