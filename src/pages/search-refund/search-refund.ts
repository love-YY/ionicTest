import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Content,Loading } from 'ionic-angular';
import {FormGroup,FormBuilder} from "@angular/forms";
import {Api} from "../../providers";
import {trigger,state,style,transition,animate} from "@angular/animations";

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
  refundData:any = [];
  showToolBar:boolean = false;
  // @ViewChild('toolbar') toolbar;
  @ViewChild(Content) content:Content;
  toolbarheight:any;
  loading:Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public api:Api,
    public loadingCtrl:LoadingController
  ) {
    /*menuCtrl.open();*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchRefundPage');
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
    this.api.post(`order-platform/app/order/deliveryorder/query/querydeliveryheader`,{})
      .subscribe((res:any)=>{
        console.log(res);
        if(res.type=='SUCCESS'){
          this.refundData = res.data;
        }else{
          console.log(res.msg);
        }
      })

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

}
