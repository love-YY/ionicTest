import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormBuilder} from "@angular/forms";
import {MyServiceProvider} from "../../providers";
import {Api} from "../../providers";

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
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post('order-platform/app/order/returnorder/query/queryreturnorderheader',this.searchAllRefundForm.getRawValue())
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.refundOrderHeader = res.data;
        }else{
          console.log(res.msg);
        }
      })
  }
  checkOrder(order:any){
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post(`order-platform/app/order/returnorder/query/queryreturnorder?returnOrderId=${order.billId}`,{})
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

}
