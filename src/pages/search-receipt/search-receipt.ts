import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import {FormGroup,FormBuilder} from "@angular/forms";
import {Api} from "../../providers";
import {MyServiceProvider} from "../../providers";

/**
 * Generated class for the SearchReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-receipt',
  templateUrl: 'search-receipt.html',
})
export class SearchReceiptPage {

  sReceiptForm:FormGroup;
  receiptOrder:any=[];
  a:{[key:string]:string|string[]} = {"a":'123',b:["123"]}
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public fb:FormBuilder,
    public api:Api,
    public myService:MyServiceProvider
  ) {
    this.sReceiptForm = fb.group({
      orderStatus:[{value:navParams.data.orderStatus,disabled:true}],
      orderGenResource:[''],
      createDate:['']
    });
    console.log(navParams.data.orderStatus);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchReceiptPage');
    this.searchReceiprOrder();
  }
  searchReceiprOrder(){
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post('order-platform/app/order/deliveryorder/query/querydeliveryheader',this.sReceiptForm.getRawValue())
      .subscribe((res:any)=>{
        console.log(res);
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.receiptOrder = res.data;
        }
      })
  }
  //类型
  typeChange():void{
    this.searchReceiprOrder();
  }
  //日期
  dateChange():void{
    this.searchReceiprOrder();
  }
  //状态
  statusChange():void{
    this.searchReceiprOrder();
  }
  checkOrder(order:any){
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post(`order-platform/app/order/deliveryorder/query/deliveryorder?deliveryId=${order.deliveryId}`,{})
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          let modal = this.modalCtrl.create('ReceiptConfirmPage',{type:'check',order:res.data});
          modal.present();
          /*if(order.orderStatus=='N'){
            this.navCtrl.push('CreateOrderPage',{type:'check',order:res.data});
          }else{

          }*/
        }else{
          console.log(res.msg);
        }
      });
  }
  receiptConfirm(order:any):void{
    this.api.post(`order-platform/app/order/deliveryorder/query/deliveryorder?deliveryId=${order.deliveryId}`,{})
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
