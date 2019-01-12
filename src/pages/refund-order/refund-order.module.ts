import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefundOrderPage } from './refund-order';

@NgModule({
  declarations: [
    RefundOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(RefundOrderPage),
  ],
})
export class RefundOrderPageModule {}
