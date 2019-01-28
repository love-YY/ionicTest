import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Api} from "../../providers";
import {MyServiceProvider} from "../../providers";

/**
 * Generated class for the SearchAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-all',
  templateUrl: 'search-all.html',
})
export class SearchAllPage {

  searchAllForm:FormGroup;
  orderStatus:any='';
  searchedOrder:any=[];
  url:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public loadingCtrl:LoadingController,
    public api:Api,
    public myService:MyServiceProvider
  ) {
    this.searchAllForm = fb.group({
      orderNo:[''],
      orderStatus:[{value:'',disabled:true}],
      orderType:[''],
      customerDeptName:['']
    });
    if(navParams.data.orderStatus==''){
      this.url = 'order-platform/app/order/placeorder/query/queryorderheader'
      this.searchAllForm.controls['orderStatus'].reset({value:navParams.data.orderStatus,disabled:false})
    }else{
      this.url='order-platform/app/order/returnorder/query/queryreturnorderheader';
      this.searchAllForm.patchValue({orderStatus:navParams.data.orderStatus});
    }
    this.orderStatus = navParams.data.orderStatus;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchAllPage');
    this.searchOrder();
  }
  ionViewDidEnter(){

  }


  searchOrder(params?:any){
    console.log(this.searchAllForm.get('orderStatus').value);
    /*let loading = this.loadingCtrl.create({
      content:'加载中...'
    });
    console.log(loading);
    loading.present();*/
    this.myService.createLoading({
      content:'加载中...'
    });
    if(params){
      this.api.post(this.url,params)
        .subscribe((res:any):any=>{
          console.log(res);
          this.myService.dismissLoading();
          if(res.type=='SUCCESS'){
            this.searchedOrder  = res.data;
            /*if(document.querySelector('ion-loading')){
              document.querySelector('ion-loading').remove()
            }*/
            // loading.dismiss();
          }else{
            console.log(res);
            // loading.dismiss();
          }
        })
    }else{
      this.api.post(this.url,this.searchAllForm.getRawValue())
        .subscribe((res:any):any=>{
          console.log(res);
          this.myService.dismissLoading();
          if(res.type=='SUCCESS'){
            this.searchedOrder  = res.data;
            /*if(document.querySelector('ion-loading')){
              document.querySelector('ion-loading').remove()
            }*/
            // loading.dismiss();
          }else{
            console.log(res);
            // loading.dismiss();
          }
        })
    }

  }
  doRefresh(e:any){
    console.log(e);
    console.log('refresh');
    this.api.post(this.url,{orderStatus:this.orderStatus})
      .subscribe((res:any):any=>{
        console.log(res);
        if(res.type=='SUCCESS'){
          this.searchedOrder  = res.data;
          e.complete();
        }else{
          console.log(res);
        }
      })
    // this.searchOrder();
  }
  cancelOrder(order:any){
    console.log(order);
    // this.searchedOrder = this.searchedOrder.filter(data=>data.orderId!=order.orderId);
    this.searchedOrder.forEach((item:any)=>{
      if(item.orderId==order.orderId){
        for(let i in order){
          item[i] = order[i];
        }
      }
    })
  }
  searchDeliveryOrder(order:any){
    console.log(order);
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post('order-platform/app/order/deliveryorder/query/querydeliveryheader',{orderNo:order.orderNo})
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.navCtrl.push('SearchAllDeliveryPage',{deliveryOrder:res.data,type:'saleTo'})
        }else{
          console.log(res.msg);
        }
      })
  }

}
