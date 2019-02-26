import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,InfiniteScroll,Events } from 'ionic-angular';
import {FormGroup,FormBuilder} from "@angular/forms";
import {MyServiceProvider} from "../../providers";
import {Api} from "../../providers";
import {Observable} from "rxjs/Observable";

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
  page:number = 1;
  total:number;
  @ViewChild(InfiniteScroll) infiniteScroll:InfiniteScroll
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public myService:MyServiceProvider,
    public api:Api,
    public modalCtrl:ModalController,
    public event:Events
  ) {
    this.searchAlldeliveryForm = fb.group({
      orderNo:[null],
      orderStatus:[null],
      orderGenResource:[null],
      customerDeptName:[null],
      startDate:[null],
      endDate:[null]
    });
    this.deliveryOrder = navParams.get('deliveryOrder');
    if(this.navParams.get('type')!='saleTo'){
      this.fromSale = true;
    }
    event.subscribe('deliveryAll',(data:any)=>{
      console.log(data);
      this.searchDeliveryOrder();
      /*this.deliveryOrder.forEach((res)=>{
        /!*if(res.orderId==data.orderId){
          Object.assign(res,data);
        }*!/

      });*/
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchAllDeliveryPage');
    if(this.navParams.get('type')!='saleTo'){
      this.searchDeliveryOrder();
    }
  }
  searchDeliveryOrder(){
    this.infiniteScroll.enable(true);
    this.page =1;
    this.deliveryOrder = [];
    this.myService.createLoading({
      content:'加载中...'
    });
    this.searchDeliveryOrderRequest().subscribe((res:any)=>{
      this.myService.dismissLoading();
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.deliveryOrder = [...this.deliveryOrder,...res.data];
      }else{
        console.log(res);
      }
    })
  }
  doRefresh(e:any){
    this.infiniteScroll.enable(true);
    this.page =1;
    this.deliveryOrder=[];
    this.searchDeliveryOrderRequest().subscribe((res:any)=>{
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.deliveryOrder = [...this.deliveryOrder,...res.data];
        e.complete();
      }else{
        console.log(res);
        e.complete()
      }
    })
  }
  doInfinite(e:any){
    if(this.deliveryOrder.length<this.total){
      // debugger;
      this.page++;
      this.searchDeliveryOrderRequest()
        .subscribe((res:any)=>{
          console.log(res);
          if(res.type=='SUCCESS'){
            this.total = res.total;
            this.deliveryOrder = [...this.deliveryOrder,...res.data];
            e.complete();
          }else{
            console.log(res);
            e.complete()
          }
        })
    }else{
      e.enable(false);
    }
  }
  searchDeliveryOrderRequest():Observable<any>{
    /*this.myService.createLoading({
      content:'加载中...'
    });*/
    return this.api.post('app/order/deliveryorder/query/querydeliveryheader',{page:this.page,limit:25,requestVo:this.searchAlldeliveryForm.getRawValue()})
      /*.subscribe((res:any)=>{
        console.log(res);
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.deliveryOrder = res.data;
        }
      })*/
  }
  checkOrder(order:any){
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post(`app/order/deliveryorder/query/deliveryorder?deliveryId=${order.deliveryId}`,{})
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
    this.api.post(`app/order/deliveryorder/query/deliveryorder?deliveryId=${order.deliveryId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          let modal = this.modalCtrl.create('ReceiptConfirmPage',{order:res.data,from:'all'});
          modal.present();
        }else{
          console.log(res.msg);
        }
      });
  }

}
