import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptOrderDetailPage } from './receipt-order-detail';

@NgModule({
  declarations: [
    ReceiptOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptOrderDetailPage),
  ],
})
export class ReceiptOrderDetailPageModule {}
