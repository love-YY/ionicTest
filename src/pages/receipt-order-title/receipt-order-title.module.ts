import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptOrderTitlePage } from './receipt-order-title';

@NgModule({
  declarations: [
    ReceiptOrderTitlePage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptOrderTitlePage),
  ],
})
export class ReceiptOrderTitlePageModule {}
