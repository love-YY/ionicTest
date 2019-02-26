import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ModalController ,Events,InfiniteScroll} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Api} from "../../providers";
import {MyServiceProvider} from "../../providers";
import {Observable} from "rxjs/Observable";

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

  page:number = 1;
  total:number;
  @ViewChild(InfiniteScroll) infiniteScroll:InfiniteScroll;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public loadingCtrl:LoadingController,
    public api:Api,
    public myService:MyServiceProvider,
    public modalCtrl:ModalController,
    public events:Events
  ) {
    this.searchAllForm = fb.group({
      orderNo:[''],
      orderStatus:[{value:'',disabled:true}],
      orderGenResource:[''],
      customerDeptName:[''],
      startDate:[null],
      endDate:[null]
    });
    if(navParams.data.orderStatus==''){
      this.url = 'app/order/placeorder/query/queryorderheader'
      this.searchAllForm.controls['orderStatus'].reset({value:navParams.data.orderStatus,disabled:false})
    }else{
      this.url='app/order/returnorder/query/queryreturnorderheader';
      this.searchAllForm.patchValue({orderStatus:navParams.data.orderStatus});
    }
    this.orderStatus = navParams.data.orderStatus;
    events.subscribe('saveOrderAll',(order:any)=>{
      // debugger;
      this.searchedOrder.forEach((res)=>{
        if(res.orderId==order.orderId){
          Object.assign(res,order);
        }
      });
      // this.searchOrder();
    });
    events.subscribe('submitOrderAll',(order:any)=>{
      // debugger;
      this.searchedOrder.forEach((res)=>{
        if(res.orderId==order.orderId){
          Object.assign(res,order);
        }
      });
      // this.searchOrder();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchAllPage');
    this.searchOrder();
  }
  ionViewDidEnter(){

  }
  searchOrder(){
    console.log(this.infiniteScroll);
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
  //删除订单
  deleteOrder(order:any):void{
    this.searchedOrder = this.searchedOrder.filter(data=>data.orderId!=order.orderId);
  }

  searchOrderRequest(params?:any):Observable<any>{
    console.log(this.searchAllForm.get('orderStatus').value);
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
      return this.api.post(this.url,{page:this.page,limit:25,requestVo:this.searchAllForm.getRawValue()})
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
    this.api.post('app/order/deliveryorder/query/querydeliveryheader',{orderNo:order.orderNo})
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.navCtrl.push('SearchAllDeliveryPage',{deliveryOrder:res.data,type:'saleTo'})
        }else{
          console.log(res.msg);
        }
      })
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
              this.navCtrl.push('CreateOrderPage',{type:'checkR',order:res.data,name:'编辑错误订单'});
            }
          });
          checkErrModal.present();
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
          this.navCtrl.push('CreateOrderPage',{type:'check',order:res.data,from:'all',name:'编辑订单'});
        }else{
          console.log(res.msg);
        }
      });
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

}
