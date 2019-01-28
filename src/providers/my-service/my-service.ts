import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController,Toast,ToastOptions,LoadingController,Loading,LoadingOptions} from "ionic-angular";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the MyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyServiceProvider {

  toast:Toast;
  loading:Loading
  constructor(
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController
  ) {
    console.log('Hello MyServiceProvider Provider');
  }
  //toast
  createToast(opts?:ToastOptions){
    this.toast = this.toastCtrl.create(opts);
    this.toast.present();
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
    this.loading.present();
  }
  dismissLoading():void{
    this.loading.dismissAll();
  }
  getLoading():Loading{
    return this.loading;
  }

}
