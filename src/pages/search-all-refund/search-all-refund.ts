import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll } from 'ionic-angular';
import {FormGroup,FormBuilder} from "@angular/forms";
import {MyServiceProvider} from "../../providers";
import {Api} from "../../providers";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the SearchAllRefundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-all-refund',
  templateUrl: 'search-all-refund.html',
})
export class SearchAllRefundPage {

  searchAllRefundForm:FormGroup;
  refundOrderHeader:any[];
  page:number = 1;
  total:number;
  @ViewChild(InfiniteScroll) infiniteScroll:InfiniteScroll;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public myService:MyServiceProvider,
    public api:Api
  ) {
    this.searchAllRefundForm = fb.group({
      orderNo:[''],
      orderStatus:[{value:'',disabled:true}],
      orderType:[''],
      customerDeptName:['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchAllRefundPage');
    this.searchRefundorder();
  }
  searchRefundorder(){
    this.infiniteScroll.enable(true);
    this.page =1;
    this.refundOrderHeader = [];
    this.myService.createLoading({
      content:'加载中...'
    });
    this.searchRefundorderRequest().subscribe((res:any)=>{
      // debugger;
      this.myService.dismissLoading();
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.refundOrderHeader = [...this.refundOrderHeader,...res.data];
      }else{
        console.log(res);
      }
    })
  }

  searchRefundorderRequest():Observable<any>{
    /*this.myService.createLoading({
      content:'加载中...'
    });*/
    return this.api.post('app/order/returnorder/query/queryreturnorderheader',this.searchAllRefundForm.getRawValue())
      /*.subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.refundOrderHeader = res.data;
        }else{
          console.log(res.msg);
        }
      })*/
  }
  checkOrder(order:any){
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post(`app/order/returnorder/query/queryreturnorder?returnOrderId=${order.billId}`,{})
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        console.log(res);
        if(res.type=='SUCCESS'){
          this.navCtrl.push('RefundOrderPage',{type:'check',order:res.data})
        }else{
          console.log(res.msg)
        }
      })
  }
  doRefresh(e:any) {
    this.infiniteScroll.enable(true);
    this.page = 1;
    this.refundOrderHeader = [];
    this.searchRefundorderRequest().subscribe((res: any) => {
      if (res.type == 'SUCCESS') {
        this.total = res.total;
        this.refundOrderHeader = [...this.refundOrderHeader, ...res.data];
        e.complete();
      } else {
        console.log(res);
        e.complete()
      }
    })
  }
  doInfinite(e:any){
    console.log(e);
    if(this.refundOrderHeader.length<this.total){
      // debugger;
      this.page++;
      this.searchRefundorderRequest()
        .subscribe((res:any)=>{
          console.log(res);
          if(res.type=='SUCCESS'){
            this.total = res.total;
            this.refundOrderHeader = [...this.refundOrderHeader,...res.data];
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
