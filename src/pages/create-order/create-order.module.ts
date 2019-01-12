import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOrderPage } from './create-order';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CreateOrderPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(CreateOrderPage),
  ],
})
export class CreateOrderPageModule {}
