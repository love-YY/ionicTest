import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseCustomerModalPage } from './choose-customer-modal';

@NgModule({
  declarations: [
    ChooseCustomerModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseCustomerModalPage),
  ],
})
export class ChooseCustomerModalPageModule {}
