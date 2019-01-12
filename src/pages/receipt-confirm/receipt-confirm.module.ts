import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptConfirmPage } from './receipt-confirm';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ReceiptConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptConfirmPage),
    PipesModule
  ],
})
export class ReceiptConfirmPageModule {}
