import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDetailPage } from './add-detail';

@NgModule({
  declarations: [
    AddDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDetailPage),
  ],
})
export class AddDetailPageModule {}
