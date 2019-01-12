import { NgModule } from '@angular/core';
import { CodePipe ,StatusPipe,OrderTypePipe} from './code/code';
@NgModule({
	declarations: [CodePipe,StatusPipe,OrderTypePipe],
	imports: [],
	exports: [CodePipe,StatusPipe,OrderTypePipe]
})
export class PipesModule {}
