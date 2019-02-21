import {Component, ViewChild} from '@angular/core';
import {FormGroup,FormBuilder} from "@angular/forms";
import { IonicPage, NavController, NavParams,ToastController,LoadingController,ModalController,Events,InfiniteScroll } from 'ionic-angular';
import {Api} from "../../providers";
// import {ReceiptConfirmPage} from "../receipt-confirm/receipt-confirm";
import {MyServiceProvider} from "../../providers";
import {Observable} from "rxjs/Observable";

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
  page:number = 1;
  total:number;

  @ViewChild(InfiniteScroll) infiniteScroll:InfiniteScroll;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api:Api,
    public fb:FormBuilder,
    public toast:ToastController,
    public loadingCtrl:LoadingController,
    public modalCtrl:ModalController,
    public myService:MyServiceProvider,
    public events:Events
  ) {
    // console.log(navParams);
    this.searchForm = fb.group({
      orderStatus:[{value:'',disabled:true}],
      orderGenResource:[''],
      createDate:['']
    });
    if(navParams.data.orderStatus==''){
      this.searchForm.controls['orderStatus'].reset({value:navParams.data.orderStatus,disabled:false})
    }else{
      this.searchForm.patchValue({orderStatus:navParams.data.orderStatus});
    }

    this.orderStatus = navParams.data.orderStatus;
    events.subscribe('saveOrder',(order:any)=>{
      this.searchedOrder.forEach((res)=>{
        if(res.orderId==order.orderId){
          Object.assign(res,order);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchOrderPage');
    this.searchOrder();
  }
  ionViewDidEnter(){

  }
  searchOrder(){
    this.infiniteScroll.enable(true);
    this.page =1;
    this.searchedOrder = [];
    this.myService.createLoading({
      content:'加载中...'
    });
    this.searchOrderRequest().subscribe((res:any)=>{
      this.myService.dismissLoading();
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.searchedOrder = [...this.searchedOrder,...res.data];
      }else{
        console.log(res);
      }
    })
  }
  searchOrderRequest(params?:any):Observable<any>{
    /*let loading = this.loadingCtrl.create({
      content:'加载中...'
    });
    console.log(loading);
    loading.present();*/
    /*this.myService.createLoading({
      content:'加载中...'
    });*/
    if(params){
      this.api.post('app/order/placeorder/query/queryorderheader',params)
        .subscribe((res:any):any=>{
          console.log(res);
          this.myService.dismissLoading();
          if(res.type=='SUCCESS'){
            this.searchedOrder  = res.data;
          }else{
            console.log(res);
          }
        })
    }else{
      return this.api.post('app/order/placeorder/query/queryorderheader',{page:this.page,limit:25,requestVo:this.searchForm.getRawValue()})
        /*.subscribe((res:any):any=>{
          console.log(res);
          this.myService.dismissLoading();
          if(res.type=='SUCCESS'){
            this.searchedOrder  = res.data;
            /!*if(document.querySelector('ion-loading')){
              document.querySelector('ion-loading').remove()
            }*!/
            // loading.dismiss();
          }else{
            console.log(res);
            // loading.dismiss();
          }
        })*/
    }

  }
  //类型
  typeChange():void{
    console.log(this.searchForm.getRawValue());
    this.searchOrder()
  }
  //日期
  dateChange():void{
    console.log(this.searchForm.getRawValue());
    this.searchOrder()
  }
  //状态
  statusChange():void{
    console.log(this.searchForm.getRawValue());
    this.searchOrder()
  }
  //删除订单
  deleteOrder(order:any):void{
    /*console.log(order);
    this.api.post(`app/order/placeorder/delorder/${order.orderId}`,{})
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
    this.infiniteScroll.enable(true);
    this.page =1;
    this.searchedOrder=[];
    this.searchOrderRequest().subscribe((res:any)=>{
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.searchedOrder = [...this.searchedOrder,...res.data];
        e.complete();
      }else{
        console.log(res);
        e.complete()
      }
    })
  }
  doInfinite(e:any){
    console.log(e);
    if(this.searchedOrder.length<this.total){
      // debugger;
      this.page++;
      this.searchOrderRequest()
        .subscribe((res:any)=>{
          console.log(res);
          if(res.type=='SUCCESS'){
            this.total = res.total;
            this.searchedOrder = [...this.searchedOrder,...res.data];
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
  checkOrder(order){
    let loading = this.loadingCtrl.create({
      content:'加载中...',
      duration:5000
    });
    loading.present();
    this.api.post(`app/order/placeorder/query/queryorder?orderId=${order.orderId}`,{})
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
    this.api.post(`app/order/placeorder/query/queryorder?orderId=${order.orderId}`,{})
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
    console.log(order);
    this.searchedOrder = this.searchedOrder.filter(data=>data.orderId!=order.orderId);
    /*this.api.post(`app/order/placeorder/voidorder?orderId=${order.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          if(this.navParams.data.orderStatus=='all'){
            order = res.data;
          }else{

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
    this.api.post(`app/order/placeorder/query/queryorder?orderId=${order.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          let modal = this.modalCtrl.create('ReceiptConfirmPage',{order:res.data});
          modal.present();
        }else{
          console.log(res.msg);
        }
      });

  }

  checkError(order:any){
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post(`app/order/placeorder/query/queryorder?orderId=${order.orderId}`,{})
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          let checkErrModal = this.modalCtrl.create('CheckErrorPage',{order:res.data});
          checkErrModal.onDidDismiss((order:any)=>{
            if(order){
              this.navCtrl.push('CreateOrderPage',{type:'checkR',order:res.data});
            }
          });
          checkErrModal.present();
        }else{
          console.log(res.msg);
        }
      });
  }
  ///callback
  saveOrderCallback(order){
    debugger;
    console.log(this.searchedOrder);
    return new Promise((resolve,reject)=>{
      debugger;
      console.log(order);
      console.log(this.searchedOrder);
      console.log(this.searchedOrder);
      this.searchedOrder.forEach((res)=>{
        if(res.orderId==order.orderId){
          for(let item in order){
            res[item] = order[item];
          }
        }
      });
      resolve();
    })
  }

}
