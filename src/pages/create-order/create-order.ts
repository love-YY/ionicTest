import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Events,ToastController } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Api} from "../../providers";
import {Storage} from "@ionic/storage";
import {MyServiceProvider} from "../../providers";

/**
 * Generated class for the CreateOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-order',
  templateUrl: 'create-order.html',
})
export class CreateOrderPage {
  createForm:FormGroup;
  user:any;
  saleParty:any={
    salePartyId:'',
      salePartyCode:'',
  salePartyName:''
  };
  orderDetail:any=[];
  sale_order_type:boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public api:Api,
    private modalCtrl:ModalController,
    public storage:Storage,
    public events:Events,
    public myService:MyServiceProvider,
    public toastCtrl:ToastController
  ) {
    this.createForm = fb.group({
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
      saleAreaName:[{value:'',disabled:true}]
    });
    console.log(navParams);
    if(navParams.data.type=='check'){
      if(navParams.data.order.orderStatus=='N'){
        this.sale_order_type = true;
      }else{
        this.sale_order_type = false;
        this.createForm.controls['memo'].reset({value:'',disabled:true});
      }
      this.createForm.patchValue(navParams.data.order);
      this.orderDetail = navParams.data.order.details;
    }else{
      this.createForm.patchValue({orderType:navParams.data.orderType});
      this.createForm.patchValue(navParams.data.moreData);
    }
    // this.createForm.patchValue({orderType:"xidi"});
    events.subscribe('detailAddOrder',(data)=>{
      this.orderDetail = data;
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateOrderPage');
    /*this.storage.get('user').then((data)=>{
      console.log(data);
      this.api.post(`order-platform/app/order/placeorder/query/newInitOrder?companyId=${data.companyId}`,{})
        .subscribe((res:any)=>{
          console.log(res);
          if(res.type=='SUCCESS'){
            this.createForm.patchValue(res.data);
          }else{
            let toast = this.toastCtrl.create({
              message: res.msg,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
        },(err:any)=>{
          console.log(err);
          this.navCtrl.pop();
        })
    })*/
  }
  //保存订单
  saveOrder(){
    let orderData = this.createForm.getRawValue();
    orderData['details'] = this.orderDetail;
    console.log(orderData);
    /*console.log(JSON.stringify(orderData));
    console.log(JSON.stringify(orderData));*/
    this.api.post('order-platform/app/order/placeorder/addorder',orderData,{withCredentials:true,headers:{'Content-Type':'application/json'}})
      .subscribe((res:any)=>{
        console.log(res);
        this.navCtrl.pop();
      },(err)=>{
        console.log(err);
      })
  }
  submitOrder(){
    let orderData = this.createForm.getRawValue();
    orderData['details'] = this.orderDetail;
    console.log(orderData);
    this.api.post('order-platform/app/order/placeorder/submitorder',orderData,{withCredentials:true,headers:{'Content-Type':'application/json'}})
      .subscribe((res:any)=>{
        console.log(res);
        this.navCtrl.pop()
      },(err)=>{
        console.log(err);
      })
  }
  //选择客户
  chooseModal(){
    let chooseModal = this.modalCtrl.create('ChooseModalPage',{title:'123'});
    chooseModal.onDidDismiss((customer)=>{
      /*this.saleParty.salePartyId = goodsOwner.goodsownerId;
      this.saleParty.salePartyCode = goodsOwner.goodsownerCode;
      this.saleParty.salePartyName = goodsOwner.goodsownerName;*/
      console.log(customer);
      if(customer){
        this.createForm.patchValue(customer);
      }

    });
    chooseModal.present();
  }
  //选择科室
  chooseDeptModal(){
    if(!this.createForm.controls['customerId'].value){
      let toast = this.toastCtrl.create({
        message: '请先选择客户',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    let chooseDeptModal = this.modalCtrl.create('ChooseDeptModalPage',{customerId:this.createForm.controls['customerId'].value});
    chooseDeptModal.onDidDismiss((dept)=>{
      console.log(dept);
      if(dept){
        this.createForm.patchValue(dept);
      }
    });
    chooseDeptModal.present();
  }
  //选择业务员
  chooseCustomerModal(){
    if(!this.createForm.controls['customerId'].value){
      let toast = this.toastCtrl.create({
        message: '请先选择客户',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    if(!this.createForm.controls['customerDeptId'].value){
      let toast = this.toastCtrl.create({
        message: '请先选择科室',
        duration: 3000,
        position: 'top',
        cssClass:'error'
      });
      toast.present();
      return;
    }
    console.log(this.createForm.controls['customerId'].value);
    let chooseDeptModal = this.modalCtrl.create('ChooseCustomerModalPage',{customerId:this.createForm.controls['customerId'].value,customerDeptId:this.createForm.controls['customerDeptId'].value});
    chooseDeptModal.onDidDismiss((customer:any)=>{

      console.log(customer);
      if(customer){
        this.createForm.patchValue(customer);
      }
    });
    chooseDeptModal.present();
  }
  //物料减少
  detailNumAdd(detail:any){
    detail.orderNum ++;

  }
  //物料增加
  detailNumMinus(detail:any){
    detail.orderNum --;
    if(detail.orderNum<1){
      this.orderDetail = this.orderDetail.filter(res=>res.goodsId!=detail.goodsId)
    }
  }
  /*
  * 添加明细*/
  addDetail(){
    this.navCtrl.push('AddDetailPage',{orderDetail:this.orderDetail})
  }

}
