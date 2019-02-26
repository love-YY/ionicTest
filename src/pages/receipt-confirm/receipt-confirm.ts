import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController,Events } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Api} from "../../providers";
import {MyServiceProvider} from "../../providers";

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
  ordertype:any;
  orderTypes={
    W:[{type:'W',value:'洗涤'},{type:'F',value:'免费'}],
    S:[{value:'灭菌',type:'S'}],
    R:[{value:'租赁',type:'R'}]
  };
  orderStatus:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public viewCtrl:ViewController,
    public api:Api,
    public toastCtrl:ToastController,
    public myService:MyServiceProvider,
    public event:Events
  ) {
    this.receiptForm = fb.group({
      deliveryId:[],
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
      isCancel:[{value:0,disabled:true}],
      orderGenResource:['']
    });
    console.log(navParams.data);
    this.orderStatus = navParams.data.order.orderStatus;
    this.receiptForm.patchValue(navParams.data.order);
    this.ordertype = navParams.data.order.orderGenResource;
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
    this.api.post(`app/order/deliveryorder/deliverymaterialconfirm`,detail)
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          this.myService.createToast({
            message:'确认成功',
            position:'top',
            cssClass:'success',
            duration:2000
          });
          console.log(res.data);
          for(let item in res.data){
            detail[item] = res.data[item];
          }
        }else{
          console.log(res.msg);
        }
      })
  }
  receiptOver(){
    this.myService.createLoading({
      content:'收货中...'
    });
    this.api.post('app/order/deliveryorder/dlvrymtrlbatchconfirm',this.receiptDetail)
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          console.log(res);
          let arr = res.data.filter(res=>res.returnFlag=='P');
          if(arr.length>=1){
            this.navParams.data.order.isCancel = 1;
            this.receiptForm.get('isCancel').setValue(1);
          }else{
            this.receiptForm.get('isCancel').setValue(0);
          }
          let data = this.receiptForm.getRawValue();
          data.details = res.data;
          this.myService.createLoading({
            content:'加载中...'
          });
          this.api.post(`app/order/deliveryorder/deliveryconfirm`,data)
            .subscribe((res:any)=>{
              this.myService.dismissLoading();
              if(res.type=='SUCCESS'){
                this.myService.createToast({
                  position:'top',
                  cssClass:'success',
                  message:'收货成功',
                  duration:1000
                });
                if(this.navParams.data.from=='all'){
                  this.event.publish('deliveryAll',res.data);
                }else{
                  this.event.publish('deliverySection',res.data);
                }
                this.navCtrl.pop();
              }else{
                console.log(res.msg);
              }
            })

        }else {
          console.log(res.msg);
        }
      });

  }

}
