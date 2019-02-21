import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Events,ToastController, } from 'ionic-angular';
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
  ordertype:any;
  orderTypes={
    W:[{type:'W',value:'洗涤'},{type:'F',value:'免费'}],
    S:[{value:'灭菌',type:'S'}],
    R:[{value:'租赁',type:'R'}]
  };
  sale_order_type:boolean = true;
  orderStatus:string;
  showEdit:boolean = false;
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
      orderType:[{value:''}],
      customerId:['',Validators.required],
      customerCode:[''],
      customerName:[{value:'',disabled:true}],
      customerDeptId:['',Validators.required],
      customerDeptCode:[''],
      customerDeptName:[{value:'',disabled:true}],
      payerName:[{value:'',disabled:true}],
      billtoPartyName:[{value:'',disabled:true}],
      salesmanId:[''],
      salesmanCode:['',Validators.required],
      salesmanName:[{value:"",disabled:true},Validators.required],
      memo:[''],
      companyId:['',Validators.required],
      companyCode:[''],
      companyName:[{value:'',disabled:true}],
      distrChannelId:['',Validators.required],
      distrChannelCode:[''],
      distrChannelName:[{value:'',disabled:true}],
      busiUnitId:['',Validators.required],
      busiUnitCode:[''],
      busiUnitName:[{value:'',disabled:true}],
      saleAreaId:[''],
      saleAreaCode:[''],
      saleAreaName:[{value:'',disabled:true}],
      orderGenResource:['']
    });
    console.log(navParams);
    events.subscribe('detailAddOrder',(data)=>{
      this.orderDetail = data;
    });
    if(this.navParams.data.type=='check'){
      if(this.navParams.data.order.orderStatus!='N'&&this.navParams.data.order.orderStatus!='V'){
        this.showEdit = true;
      }
      if(this.navParams.data.order.orderStatus=='N'){
        this.sale_order_type = true;
      }else{
        this.sale_order_type = false;
        this.createForm.controls['memo'].reset({value:'',disabled:true});
        this.createForm.controls['orderType'].reset({value:'',disabled:true})
      }
    }else if(this.navParams.data.type=='checkR'){
      this.sale_order_type = true;
      /*if(this.navParams.data.order.orderStatus!='N'||this.navParams.data.order.orderStatus!='V'){
        this.showEdit = true;
      }*/
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateOrderPage');
    if(this.navParams.data.type=='check'){
      /*if(this.navParams.data.order.orderStatus=='N'){
        this.sale_order_type = true;
      }else{
        this.sale_order_type = false;
        this.createForm.controls['memo'].reset({value:'',disabled:true});
        this.createForm.controls['orderType'].reset({value:'',disabled:true})
      }*/
      this.createForm.patchValue(this.navParams.data.order);
      this.ordertype = this.navParams.data.order.orderGenResource;
      this.orderDetail = this.navParams.data.order.details;
    }else if(this.navParams.data.type=='checkR'){
      this.createForm.patchValue(this.navParams.data.order);
      this.ordertype = this.navParams.data.order.orderGenResource;
      this.orderDetail = this.navParams.data.order.details;
    }else{
      this.createForm.patchValue({orderGenResource:this.navParams.data.orderType});
      this.createForm.patchValue({orderType:this.navParams.data.orderType});
      this.ordertype = this.navParams.data.orderType;
      this.createForm.patchValue(this.navParams.data.moreData);
      console.log(this.navParams.data.moreData);
    }
  }
  //保存订单
  saveOrder(){
    for (const i in this.createForm.controls) {
      this.createForm.controls[ i ].markAsDirty();
      this.createForm.controls[ i ].updateValueAndValidity();

    }
    if(!this.createForm.valid){
      this.myService.createToast({
        message:'表单输入不完整',
        position:'top',
        cssClass:'warning',
        duration:2000
      })
    }else{
      let orderData = this.createForm.getRawValue();
      orderData['details'] = this.orderDetail;
      console.log(orderData);
      console.log(JSON.stringify(orderData));
      this.myService.createLoading({
        content:'保存中...'
      });
      this.api.post('app/order/placeorder/addorder',orderData,{withCredentials:true,headers:{'Content-Type':'application/json'}})
        .subscribe((res:any)=>{
          console.log(res);
          this.myService.dismissLoading();
          if(res.type=='SUCCESS'){
            this.myService.createToast({
              message:'保存成功',
              position:'top',
              duration:1000,
              cssClass:'success'
            });
            /*console.log(this.navParams.get('saveCallback'));
            if(this.navParams.get('saveCallback')){
              this.navParams.get('saveCallback')(res.data).then(()=>{
                this.navCtrl.pop();
              })
            }else{
              this.navCtrl.pop();
            }*/
            if(this.navParams.get('type')=='check'){
              if(this.navParams.get('from')=='all'){
                this.events.publish('saveOrderAll',res.data);
                this.navCtrl.pop();
              }else {
                this.events.publish('saveOrder',res.data);
                this.navCtrl.pop();
              }

            }else{
              this.navCtrl.pop();
            }

          }else{
            console.log(res.msg);
          }
        },(err)=>{
          console.log(err);
        })
    }

  }
  submitOrder(){
    for (const i in this.createForm.controls) {
      this.createForm.controls[ i ].markAsDirty();
      this.createForm.controls[ i ].updateValueAndValidity();
    }
    if(!this.createForm.valid){
      this.myService.createToast({
        message:'表单输入不完整',
        position:'top',
        cssClass:'warning',
        duration:2000
      });
    }else{
      let orderData = this.createForm.getRawValue();
      orderData['details'] = this.orderDetail;
      console.log(orderData);
      this.myService.createLoading({
        content:'提交中...'
      });
      this.api.post('app/order/placeorder/submitorder',orderData)
        .subscribe((res:any)=>{
          console.log(res);
          this.myService.dismissLoading();
          if(res.type=='SUCCESS'){
            this.myService.createToast({
              message:'提交成功',
              position:'top',
              duration:1000,
              cssClass:'success'
            });
            this.navCtrl.pop();

          }else{
            console.log(res.msg);
          }

        },(err)=>{
          console.log(err);
        })
    }
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
        this.createForm.patchValue(customer,{emitEvent:true});
      }

    });
    chooseModal.present();
  }
  //客户改变
  customerChange(e:any){
      this.createForm.patchValue({customerDeptId:'',customerDeptCode:'',customerDeptName:'',salesmanId:'',salesmanCode:'',salesmanName:''})

  }
  //选择科室
  chooseDeptModal(){
    if(!this.createForm.controls['customerId'].value){
      /*let toast = this.toastCtrl.create({
        message: '请先选择客户',
        duration: 3000,
        position: 'top'
      });
      toast.present();*/
      this.myService.createToast({
        message: '请先选择客户',
        duration: 3000,
        position: 'top',
        cssClass:'warning'
      });
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
      /*let toast = this.toastCtrl.create({
        message: '请先选择客户',
        duration: 3000,
        position: 'top'
      });
      toast.present();*/
      this.myService.createToast({
        message: '请先选择客户',
        duration: 3000,
        position: 'top',
        cssClass:'warning'
      });
      return;
    }
    if(!this.createForm.controls['customerDeptId'].value){
      /*let toast = this.toastCtrl.create({
        message: '请先选择科室',
        duration: 3000,
        position: 'top',
        cssClass:'error'
      });
      toast.present();*/
      this.myService.createToast({
        message: '请先选择客户',
        duration: 3000,
        position: 'top',
        cssClass:'warning'
      });
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
    this.navCtrl.push('AddDetailPage',{orderDetail:this.orderDetail,orderGenResource:this.createForm.get('orderGenResource').value})
  }
  /*copyOrder*/
  copyOrder(){
    // console.log(this.createForm.get('orderId').value);
    let orderId = this.createForm.get('orderId').value;
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post(`app/order/placeorder/query/copesaleorder?orderId=${orderId}`,{})
      .subscribe((res:any)=>{
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          this.sale_order_type = true;
          this.createForm.patchValue(res.data);
          this.orderDetail = res.data.details;
        }else{
          console.log(res);
        }
      })
  }
}
