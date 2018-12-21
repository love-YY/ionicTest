import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreInfoPage } from './more-info';

@NgModule({
  declarations: [
    MoreInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreInfoPage),
  ],
})
export class MoreInfoPageModule {}
