import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseModalPage } from './choose-modal';

@NgModule({
  declarations: [
    ChooseModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseModalPage),
  ],
})
export class ChooseModalPageModule {}
