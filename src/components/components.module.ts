import { NgModule } from '@angular/core';
import { SearchResultComponent } from './search-result/search-result';
import {IonicPageModule} from "ionic-angular";
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
	declarations: [SearchResultComponent],
	imports: [IonicPageModule,PipesModule],
	exports: [SearchResultComponent]
})
export class ComponentsModule {}
