import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopModalPage } from './shop-modal';

@NgModule({
  declarations: [
    ShopModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopModalPage),
  ],
})
export class ShopModalPageModule {}
