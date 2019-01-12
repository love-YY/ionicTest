import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDetailPage } from './add-detail';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddDetailPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(AddDetailPage),
  ],
})
export class AddDetailPageModule {}
