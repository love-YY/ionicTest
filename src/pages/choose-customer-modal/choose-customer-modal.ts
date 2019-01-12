import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Api} from "../../providers";

/**
 * Generated class for the ChooseCustomerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-customer-modal',
  templateUrl: 'choose-customer-modal.html',
})
export class ChooseCustomerModalPage {
  customers:any=[];
  salesmanName:any;
  salesmanCode:any;
  customerId:any;
  customerDeptId:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public api:Api
  ) {
    this.customerId = navParams.data.customerId;
    this.customerDeptId = navParams.data.customerDeptId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseCustomerModalPage');
  }
  selectCancel(){
    this.viewCtrl.dismiss();
  }
  search(){
    this.api.post('order-platform/app/order/placeorder/query/querysalesman',{
      requestVo:{
        cusstomerId:this.customerId,
        customerDeptId:this.customerDeptId,
        salesmanName:this.salesmanName,
        salesmanCode:this.salesmanCode
      }
    })
      .subscribe((res:any)=>{
        console.log(res);
        this.customers = res.data;
      })

  }
  add(customer:any){
    this.viewCtrl.dismiss(customer);
  }

}
