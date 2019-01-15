import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import { IonicPage, NavController, NavParams,ToastController,LoadingController,Loading,ModalController } from 'ionic-angular';
import {Api} from "../../providers";
import {ReceiptConfirmPage} from "../receipt-confirm/receipt-confirm";

/**
 * Generated class for the SearchOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-order',
  templateUrl: 'search-order.html',
})
export class SearchOrderPage {
  orderStatus:any='';
  orderType:any = 'a';
  searchedOrder:any = [];
  searchForm:FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api:Api,
    public fb:FormBuilder,
    public toast:ToastController,
    public loadingCtrl:LoadingController,
    public modalCtrl:ModalController
  ) {
    // console.log(navParams);
    this.searchForm = fb.group({
      orderStatus:[{value:'',disabled:true}],
      orderType:[''],
      createDate:['']
    });
    if(navParams.data.orderStatus==''){
      this.searchForm.controls['orderStatus'].reset({value:navParams.data.orderStatus,disabled:false})
    }else{
      this.searchForm.patchValue({orderStatus:navParams.data.orderStatus});
    }

    this.orderStatus = navParams.data.orderStatus;
    /*this.loading = loadingCtrl.create({
      content:'加载中...'
    })*/
    // console.log(this.orderStatus)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchOrderPage');
  }
  ionViewDidEnter(){
    this.searchOrder();
  }
  searchOrder(params?:any){
    let loading = this.loadingCtrl.create({
      content:'加载中...'
    });
    console.log(loading);
    loading.present();
    if(params){
      this.api.post('order-platform/app/order/placeorder/query/queryorderheader',params)
        .subscribe((res:any):any=>{
          console.log(res);
          if(res.type=='SUCCESS'){
            this.searchedOrder  = res.data;
            /*if(document.querySelector('ion-loading')){
              document.querySelector('ion-loading').remove()
            }*/
            loading.dismiss();
          }else{
            console.log(res);
            loading.dismiss();
          }
        })
    }else{
      this.api.post('order-platform/app/order/placeorder/query/queryorderheader',{orderStatus:this.orderStatus})
        .subscribe((res:any):any=>{
          console.log(res);
          if(res.type=='SUCCESS'){
            this.searchedOrder  = res.data;
            /*if(document.querySelector('ion-loading')){
              document.querySelector('ion-loading').remove()
            }*/
            loading.dismiss();
          }else{
            console.log(res);
            loading.dismiss();
          }
        })
    }

  }
  //类型
  typeChange():void{
    console.log(this.searchForm.getRawValue());
    this.searchOrder(this.searchForm.getRawValue())
  }
  //日期
  dateChange():void{
    console.log(this.searchForm.getRawValue());
    this.searchOrder(this.searchForm.getRawValue())
  }
  //状态
  statusChange():void{
    console.log(this.searchForm.getRawValue());
    this.searchOrder(this.searchForm.getRawValue())
  }
  //删除订单
  deleteOrder(order:any):void{
    /*console.log(order);
    this.api.post(`order-platform/app/order/placeorder/delorder/${order.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          let toast = this.toast.create({
            position:'top',
            message:'删除成功',
            duration:2000
          });
          toast.present();
          this.searchedOrder = this.searchedOrder.filter(data=>data.orderId!=order.orderId)
        }else{
          let toast = this.toast.create({
            position:'top',
            message:res.msg,
            duration:2000
          });
          toast.present();
        }
      })*/
    this.searchedOrder = this.searchedOrder.filter(data=>data.orderId!=order.orderId);

  }
  doRefresh(e:any){
    console.log(e);
    console.log('refresh');
    this.api.post('order-platform/app/order/placeorder/query/queryorderheader',{orderStatus:this.orderStatus})
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
  /*doInfinite(e:any){
    setTimeout(()=>{
      e.complete();
    },3000)
  }*/
  checkOrder(order){
    let loading = this.loadingCtrl.create({
      content:'加载中...',
      duration:5000
    });
    loading.present();
    this.api.post(`order-platform/app/order/placeorder/query/queryorder?orderId=${order.orderId}`,{})
      .subscribe((res:any)=>{
        loading.dismiss();
        if(res.type=='SUCCESS'){
          this.navCtrl.push('CreateOrderPage',{type:'check',order:res.data});
          /*if(order.orderStatus=='N'){
            this.navCtrl.push('CreateOrderPage',{type:'check',order:res.data});
          }else{

          }*/
        }else{
          console.log(res.msg);
        }
      });

  }
  //编辑订单
  editOrder(order):void{
    this.api.post(`order-platform/app/order/placeorder/query/queryorder?orderId=${order.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          this.navCtrl.push('CreateOrderPage',{type:'check',order:res.data});
        }else{
          console.log(res.msg);
        }
      });
  }
  //确认订单
  submitOrder(order:any):void{

  }
  //作废订单
  cancelOrder(order):void{
    /*this.api.post(`order-platform/app/order/placeorder/voidorder?orderId=${order.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          if(this.navParams.data.orderStatus=='all'){
            order = res.data;
          }else{
            this.searchedOrder = this.searchedOrder.filter(data=>data.orderId!=order.orderId)
          }
        }else{
          console.log(res.msg);
        }
    })*/
  }
  //查看原订单
  checkOriginalOrder():void{

  }
  //收货确认
  receiptConfirm(order):void{
    // this.navCtrl.push('ReceiptConfirmPage');
    this.api.post(`order-platform/app/order/placeorder/query/queryorder?orderId=${order.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          let modal = this.modalCtrl.create('ReceiptConfirmPage',{order:res.data});
          modal.present();
        }else{
          console.log(res.msg);
        }
      });

  }

}
