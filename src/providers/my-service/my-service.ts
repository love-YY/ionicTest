///<reference path="../../../node_modules/ionic-angular/components/loading/loading.d.ts"/>
import { Injectable } from '@angular/core';
import {ToastController,Toast,ToastOptions,LoadingController,Loading,LoadingOptions} from "ionic-angular";
import {Api} from "..";

/*
  Generated class for the MyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyServiceProvider {

  toast:Toast;
  loading:Loading;
  userAuthors:[{}|{[key:string] :string}];
  isSave:boolean = false;

  constructor(
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,
    private api:Api
  ) {
    console.log('Hello MyServiceProvider Provider');
  }
  //toast
  createToast(opts?:ToastOptions){
    this.toast = this.toastCtrl.create(opts);
    this.toast.present().then();
  }
  dismissToast():void{
    this.toast.dismissAll();
  }
  getToast():Toast{
    return this.toast;
  }
  //loading
  createLoading(opts?:LoadingOptions):void{
    this.loading = this.loadingCtrl.create(opts);
    this.loading.present().then();
  }
  dismissLoading():void{
    this.loading.dismissAll();
  }
  getLoading():Loading{
    return this.loading;
  }
  loadUserAuthor(userId:number){
    this.api.post(`app/author/order/placeordertype?userId=${userId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          this.userAuthor = res.data;
        }else{
          console.log(res.msg);
        }

      })
  }

  set userAuthor(userAuthors:[{}|{[kay:string]:string}]){
    this.userAuthors = userAuthors;
  }

  get userAuthor(){
    return this.userAuthors;
  }

  set isSavePassword(is:boolean){
    this.isSave = is;
  }
  get isSavePassword(){
    return this.isSave;
  }
}
