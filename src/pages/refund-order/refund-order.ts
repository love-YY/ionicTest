import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,Events} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Api} from "../../providers";
import {MyServiceProvider} from "../../providers";

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
  ordertype:any;
  //预览
  checked:boolean = false;
  orderTypes={
    W:[{type:'W',value:'洗涤'},{type:'F',value:'免费'}],
    S:[{value:'灭菌',type:'S'}],
    R:[{value:'租赁',type:'R'}]
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public modalCtrl:ModalController,
    public api:Api,
    public events:Events,
    public myService:MyServiceProvider
  ) {
    this.refundOrderForm = fb.group({
      deliveryId:[''],
      initialOrderId: [''],
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
      memo:[''],
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
      orderGenResource:['']
    });
    console.log(navParams.data.order);
    if(navParams.data.type=='check'){
      this.checked = true;
      this.refundOrderForm.get('memo').reset({value:'',disabled:true});
      this.refundOrderForm.patchValue(navParams.data.order);
      this.refundOrderDetail = navParams.data.order.returnOrderDetailes;
    }else{
      this.refundOrderForm.patchValue({initialOrderId:navParams.data.order.orderId})
      this.refundOrderForm.patchValue(navParams.data.order);
      this.ordertype = navParams.data.order.orderGenResource;
    }
    // let initialOrderId = navParams.data.order.orderId;

    // this.refundOrderForm.get('initialOrderId').setValue(initialOrderId);
    // this.refundOrderDetail = navParams.data.order.returnOrderDetailes;
    events.subscribe('addrRefundDetail',(data)=>{
      this.refundOrderDetail = data;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefundOrderPage');
  }
  addRefundDetail(detail:any){
    this.api.post(`order-platform/app/order/deliveryorder/query/deliveryretirematerial`,{requestVo:{deliveryId:this.refundOrderForm.get('deliveryId').value}})
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
    this.myService.createLoading({
      content:'加载中...'
    });
    let data = this.refundOrderForm.getRawValue();
    data.returnOrderDetailes = this.refundOrderDetail;
    console.log(JSON.stringify(data));
    this.api.post('order-platform/app/order/returnorder/addreturnorder',data)
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.navCtrl.pop();
        }else{
          console.log(res.msg)
        }
      })
  }
  delReDetail(order:any):void{
    console.log(order);
    this.refundOrderDetail = this.refundOrderDetail.filter(data=>data.goodsId!=order.goodsId);
  }
}
