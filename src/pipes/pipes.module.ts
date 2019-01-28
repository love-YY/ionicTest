import { NgModule } from '@angular/core';
import { CodePipe ,StatusPipe,OrderTypePipe,DeliveryCode} from './code/code';
@NgModule({
	declarations: [CodePipe,StatusPipe,OrderTypePipe,DeliveryCode],
	imports: [],
	exports: [CodePipe,StatusPipe,OrderTypePipe,DeliveryCode]
})
export class PipesModule {}
