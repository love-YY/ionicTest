import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchOrderPage } from './search-order';
import {PipesModule} from "../../pipes/pipes.module";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SearchOrderPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(SearchOrderPage),
  ],
})
export class SearchOrderPageModule {}
