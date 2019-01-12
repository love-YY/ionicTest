import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Api} from "../../providers";

/**
 * Generated class for the ReceiptConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt-confirm',
  templateUrl: 'receipt-confirm.html',
})
export class ReceiptConfirmPage {
  pet:string = 'orderDetail';
  receiptForm:FormGroup;
  receiptDetail:any=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public viewCtrl:ViewController,
    public api:Api
  ) {
    this.receiptForm = fb.group({
      orderId: [''],
      orderType:[{value:'',disabled:true}],
      customerId:[''],
      customerCode:[''],
      customerName:[{value:'',disabled:true}],
      customerDeptId:[''],
      customerDeptCode:[''],
      customerDeptName:[{value:'',disabled:true}],
      payerName:[{value:'',disabled:true}],
      billtoPartyName:[{value:'',disabled:true}],
      salesmanId:[''],
      salesmanCode:[''],
      salesmanName:[{value:"",disabled:true},Validators.required],
      memo:[{value:'',disabled:true}],
      companyId:[''],
      companyCode:[''],
      companyName:[{value:'',disabled:true}],
      distrChannelId:[''],
      distrChannelCode:[''],
      distrChannelName:[{value:'',disabled:true}],
      busiUnitId:[''],
      busiUnitCode:[''],
      busiUnitName:[{value:'',disabled:true}],
      saleAreaId:[''],
      saleAreaCode:[''],
      saleAreaName:[{value:'',disabled:true}],
      isCancel:[{value:0,disabled:true}]
    });
    console.log(navParams.data.order);
    this.receiptForm.patchValue(navParams.data.order);
    this.receiptDetail = navParams.data.order.details;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptConfirmPage');
  }
  selectCancel(){
    this.viewCtrl.dismiss();
  }
  receiptNumMinus(detail:any){
    detail.recDeliveryNum--;
  }
  receiptNumAdd(detail:any){
    detail.recDeliveryNum++;
  }
  backNumMinus(detail:any){
    detail.unRecNum--;
  }
  backNumAdd(detail:any){
    detail.unRecNum++;
  }
  receiptSingleDetail(detail:any){
    console.log(JSON.stringify(detail));
    this.api.post(`order-platform/app/order/placeorder/ordermaterialconfirm`,detail)
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          console.log(res.data);
        }else{
          console.log(res.msg);
        }
      })
  }

}
