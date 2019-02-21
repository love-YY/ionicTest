import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Content,Loading,InfiniteScroll } from 'ionic-angular';
import {FormGroup,FormBuilder} from "@angular/forms";
import {Api} from "../../providers";
import {trigger,state,style,transition,animate} from "@angular/animations";
import {MyServiceProvider} from "../../providers";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the SearchRefundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-refund',
  templateUrl: 'search-refund.html',
  animations:[
    trigger('openClose', [
      // ...
      state('open', style({
        top:`0px`,
        display:'block',
        opacity:1
      })),
      state('closed', style({
        top:`-300px`,
        display:'none',
        opacity:0
      })),
      transition('open => closed', [
        animate('.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class SearchRefundPage {

  refundFrom:FormGroup;
  refundData:any[] = [];
  showToolBar:boolean = false;
  page:number = 1;
  total:number;
  // @ViewChild('toolbar') toolbar;
  @ViewChild(Content) content:Content;
  @ViewChild(InfiniteScroll) infiniteScroll:InfiniteScroll
  toolbarheight:any;
  loading:Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public api:Api,
    public loadingCtrl:LoadingController,
    public myService:MyServiceProvider
  ) {
    this.refundFrom = fb.group({
      orderGenResource:[null],
      customerName:[null],
      deliveryNo:[null]
    });
    this.refundFrom.patchValue({orderGenResource:navParams.data.orderType});
  }

  ionViewDidLoad() {
    this.showToolBar = true;
    // this.toolbarheight = this.toolbar._elementRef.nativeElement.offsetHeight;
  }
  chaneToBack(refund:any){
    /*this.api.post(`order-platform/app/order/returnorder/salescvtrtnorder?orderId=${refund.orderId}`,{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          this.navCtrl.push('RefundOrderPage',{order:res.data});
        }
    });*/
    this.navCtrl.push('RefundOrderPage',{order:refund});

  }
  //搜索
  searchRefund(){
    this.infiniteScroll.enable(true);
    this.page =1;
    this.refundData = [];
    this.myService.createLoading({
      content:'加载中...'
    });
    this.searchRefundRequest().subscribe((res:any)=>{
      this.myService.dismissLoading();
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.refundData = [...this.refundData,...res.data];
      }else{
        console.log(res);
      }
    })
  }
  searchRefundRequest():Observable<any>{
    /*this.myService.createLoading({
      content:'正在搜索...'
    });*/
    return this.api.post(`app/order/deliveryorder/query/querydeliveryheader`,this.refundFrom.getRawValue())
      /*.subscribe((res:any)=>{
        this.myService.dismissLoading();
        console.log(res);
        if(res.type=='SUCCESS'){
          this.refundData = res.data;
        }else{
          console.log(res.msg);
        }
      })*/

  }
  showSearch(){
    this.showToolBar = !this.showToolBar;
  }
  toolbarDone(e:any){
    this.content.resize();
  }
  /*contentScroll(e:any){
    console.log(e);
    console.log(this.showToolBar);
    this.showToolBar = !this.showToolBar;

  }*/
  ionViewWillUnload(){
    // ;
    console.log(this.loading);
    /*if(this.loading.index<=0){
      this.loading.dismiss();
    }*/
    /*if(this.loading)
    this.loading.dismissAll();*/
  }
  doRefresh(e:any){
    this.infiniteScroll.enable(true);
    this.page =1;
    this.refundData=[];
    this.searchRefundRequest().subscribe((res:any)=>{
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.refundData = [...this.refundData,...res.data];
        e.complete();
      }else{
        console.log(res);
        e.complete()
      }
    })
  }
  doInfinite(e:any){
    console.log(e);
    if(this.refundData.length<this.total){
      // debugger;
      this.page++;
      this.searchRefundRequest()
        .subscribe((res:any)=>{
          console.log(res);
          if(res.type=='SUCCESS'){
            this.total = res.total;
            this.refundData = [...this.refundData,...res.data];
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
