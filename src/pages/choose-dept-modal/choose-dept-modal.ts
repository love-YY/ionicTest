import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Api} from "../../providers";

/**
 * Generated class for the ChooseDeptModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-dept-modal',
  templateUrl: 'choose-dept-modal.html',
})
export class ChooseDeptModalPage {
  depts:any=[]
  customerDeptCode:any;
  customerDeptName:any;
  customerId:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public api:Api
  ) {
    this.customerId = navParams.data.customerId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseDeptModalPage');
  }
  selectCancel(){
    this.viewCtrl.dismiss();
  }
  search(){
    this.api.post('app/order/placeorder/query/querycustomerdept',{
      requestVo:{
        cusstomerId:this.customerId,
        customerDeptName:this.customerDeptName,
        customerDeptCode:this.customerDeptCode
      }
    })
      .subscribe((res:any)=>{
        console.log(res);
        this.depts = res.data;
      })

  }
  add(dept:any){
    this.viewCtrl.dismiss(dept);
  }

}
