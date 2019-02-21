import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckErrorPage } from './check-error';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CheckErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckErrorPage),
    PipesModule
  ],
})
export class CheckErrorPageModule {}
