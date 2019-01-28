import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {FormGroup,FormBuilder} from "@angular/forms";
import {MyServiceProvider} from "../../providers";
import {Api} from "../../providers";

/**
 * Generated class for the SearchAllDeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-all-delivery',
  templateUrl: 'search-all-delivery.html',
})
export class SearchAllDeliveryPage {
  searchAlldeliveryForm:FormGroup;
  deliveryOrder:any[];
  fromSale:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public myService:MyServiceProvider,
    public api:Api,
    public modalCtrl:ModalController
  ) {
    this.searchAlldeliveryForm = fb.group({
      orderNo:[''],
      orderStatus:[''],
      orderType:[''],
      customerDeptName:['']
    });
    this.deliveryOrder = navParams.get('deliveryOrder');
    if(this.navParams.get('type')!='saleTo'){
      this.fromSale = true;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchAllDeliveryPage');
    if(this.navParams.get('type')!='saleTo'){
      this.searchDeliveryOrder();
    }

  }
  searchDeliveryOrder(){
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post('order-platform/app/order/deliveryorder/query/querydeliveryheader',this.searchAlldeliveryForm.getRawValue())
      .subscribe((res:any)=>{
        console.log(res);
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.deliveryOrder = res.data;
        }
      })
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
