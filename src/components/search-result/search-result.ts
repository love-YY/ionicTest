import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoadingController,NavController,ToastController,ModalController} from "ionic-angular";
import {Api} from "../../providers";

/**
 * Generated class for the SearchResultComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-result',
  templateUrl: 'search-result.html'
})
export class SearchResultComponent {


  @Input() dataArr:any = [];
  @Input() status:any;
  @Output('delete') delete:EventEmitter<any> = new EventEmitter<any>();
  @Output('cancel') cancel:EventEmitter<any> = new EventEmitter<any>();
  @Output('submit') submit:EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public loadingCtrl:LoadingController,
    public navCtrl:NavController,
    public api:Api,
    public toast:ToastController,
    public modalCtrl:ModalController
  ) {
    console.log('Hello SearchResultComponent Component');
  }
  //预览
  checkOrder(order){
    console.log(this.status);
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
  //删除订单
  deleteOrder(order:any):void{
    console.log(order);
    this.api.post(`order-platform/app/order/placeorder/delorder/${order.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          let toast = this.toast.create({
            position:'top',
            message:'删除成功',
            duration:2000
          });
          toast.present();
          // this.dataArr = this.dataArr.filter(data=>data.orderId!=order.orderId);
          this.delete.emit(order);
        }else{
          let toast = this.toast.create({
            position:'top',
            message:res.msg,
            duration:2000
          });
          toast.present();
        }
      })
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
  submitOrder():void{

  }
  //作废订单
  cancelOrder(order):void{
    this.api.post(`order-platform/app/order/placeorder/voidorder?orderId=${order.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          if(this.status=='all'){
            order = res.data;
          }else{
            // this.searchedOrder = this.searchedOrder.filter(data=>data.orderId!=order.orderId)
          }
        }else{
          console.log(res.msg);
        }
      })
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
