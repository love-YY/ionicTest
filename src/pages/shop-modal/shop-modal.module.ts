import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopModalPage } from './shop-modal';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ShopModalPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ShopModalPage),
  ],
})
export class ShopModalPageModule {}
