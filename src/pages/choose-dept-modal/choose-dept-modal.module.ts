import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseDeptModalPage } from './choose-dept-modal';

@NgModule({
  declarations: [
    ChooseDeptModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseDeptModalPage),
  ],
})
export class ChooseDeptModalPageModule {}
