import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {MyServiceProvider} from "../../providers";
import {Api} from "../../providers";

/**
 * Generated class for the CheckErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-error',
  templateUrl: 'check-error.html',
})
export class CheckErrorPage {

  checkErrForm:FormGroup;
  errDetail:any[];
  ordertype:any;
  orderTypes={
    W:[{type:'W',value:'洗涤'},{type:'F',value:'免费'}],
    S:[{value:'灭菌',type:'S'}],
    R:[{value:'租赁',type:'R'}]
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public fb:FormBuilder,
    public myService:MyServiceProvider,
    public api:Api
  ) {
    this.checkErrForm =fb.group({
      orderId: [''],
      orderType:[{value:'',disabled:true}],
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
      memo:[{value:'',disabled:true}],
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
      orderGenResource:[''],
      sapHandleMessage:[{value:null,disabled:true}],
      sapHandleStatus:[null]
    });
    console.log(navParams.data.order);
    this.checkErrForm.patchValue(navParams.data.order);
    this.errDetail = navParams.data.order.details;
    this.ordertype = this.navParams.data.order.orderGenResource;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckErrorPage');
  }
  selectCancel(){
    this.viewCtrl.dismiss();
  }
  editOrder(){
    console.log('edit');
    this.myService.createLoading({
      content:'加载中...'
    });
    this.api.post(`app/order/placeorder/query/queryorder?orderId=${this.checkErrForm.get('orderId').value}`,{})
      .subscribe((res:any)=>{
        // this.viewCtrl.dismiss();
        this.myService.dismissLoading();
        if(res.type=='SUCCESS'){
          // this.navCtrl.push('CreateOrderPage',{type:'checkR',order:res.data});
          this.viewCtrl.dismiss(res.data);
        }else{
          console.log(res.msg);
        }
      })

  }

}
