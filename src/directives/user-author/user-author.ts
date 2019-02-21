import { Directive } from '@angular/core';
import {TemplateRef,ViewContainerRef,Input} from "@angular/core";
import {MyServiceProvider} from "../../providers";

/**
 * Generated class for the UserAuthorDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[userAuthor]' // Attribute selector
})
export class UserAuthorDirective {

  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer:ViewContainerRef,
    private myService:MyServiceProvider
  ) {

  }

  @Input() set userAuthor(type:string){
      if(this.getAuthor(type)){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }else{
        this.viewContainer.clear();
      }
  }

  getAuthor(type:string):boolean{
    let Authority = this.myService.userAuthor.find((value:any) => {
      return value.orderTypeCode ==type;
    });
    return !!Authority;

  }

}
