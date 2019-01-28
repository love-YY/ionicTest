import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefundOrderPage } from './refund-order';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    RefundOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(RefundOrderPage),
    PipesModule
  ],
})
export class RefundOrderPageModule {}
