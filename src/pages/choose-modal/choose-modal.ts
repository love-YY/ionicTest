import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import {Api} from "../../providers";

/**
 * Generated class for the ChooseModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-modal',
  templateUrl: 'choose-modal.html',
})
export class ChooseModalPage {
  title:any='选择';
  customerName:any;
  customerCode:any;
  goodsOwners:any=[];
  url:any;
  type:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private api:Api
  ) {
    console.log(navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseModalPage');
  }
  selectCancel(){
    this.viewCtrl.dismiss();
  }
  search(){
    this.api.post('order-platform/app/order/placeorder/query/querycustomer',{
      requestVo:{
        customerName:this.customerName,
        customerCode:this.customerCode
      }
    })
      .subscribe((res:any)=>{
      console.log(res);
      this.goodsOwners = res.data;
    })

  }
  add(goodsOwner:any){
    this.viewCtrl.dismiss(goodsOwner);
  }

}
