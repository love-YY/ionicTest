import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,Events} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Api} from "../../providers";

/**
 * Generated class for the RefundOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refund-order',
  templateUrl: 'refund-order.html',
})
export class RefundOrderPage {

  refundOrderForm:FormGroup;
  refundOrderDetail:any=[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public modalCtrl:ModalController,
    public api:Api,
    public events:Events
  ) {
    this.refundOrderForm = fb.group({
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
      saleAreaName:[{value:'',disabled:true}]
    });
    this.refundOrderForm.patchValue(navParams.data.order);
    // this.refundOrderDetail = navParams.data.order.returnOrderDetailes;
    events.subscribe('addrRefundDetail',(data)=>{
      this.refundOrderDetail = data;
    })
    /*this.api.post('order-platform/app/order/returnorder/query/queryreturnorder',{})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          console.log(res);
          this.refundOrderForm.patchValue(res.data);
          this.refundOrderDetail = res.data.returnOrderDetailes;
          console.log(this.refundOrderDetail);
        }else{
          console.log(res.msg)
        }
      })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefundOrderPage');
  }
  addRefundDetail(){
    this.api.post(`order-platform/app/order/returnorder/query/querycanrtnmaterial`,{requestVo:{orderId:126}})
      .subscribe((res:any)=>{
        if(res.type=='SUCCESS'){
          res.data.forEach((data:any)=>{
            this.refundOrderDetail.forEach((detail:any)=>{
              if(data.goodsId==detail.goodsId){
                data.returnNum = detail.returnNum;
              }
            })
          });
          let refundDetailModal =  this.modalCtrl.create('RefundDetailModalPage',{detail:res.data,addDetail:JSON.parse(JSON.stringify(this.refundOrderDetail))});
          refundDetailModal.present();
        }
      })

  }
  detailNumMinus(detail:any){
    detail.returnNum --;
    if(detail.returnNum<1){
      this.refundOrderDetail = this.refundOrderDetail.filter(res=>res.goodsId!=detail.goodsId)
    }
  }
  detailNumAdd(detail:any){
    if(detail.returnNum>=detail.retiringNum){

    }else{
      detail.returnNum++;
    }
  }

  submitRefundOrder(){
    // url:'order-platform/app/order/returnorder/addreturnorder'
  }
}
