import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Api} from "../../providers";

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
  orderDetail:any=[
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5},
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5},
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5}
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public api:Api
  ) {
    this.createForm = fb.group({
      orderType:['',Validators.required],
      salePartyName:[{value:'',disabled:true}],
      shiptoPartyName:[{value:'',disabled:true}],
      payerName:[{value:'',disabled:true}],
      billtoPartyName:[{value:'',disabled:true}],
      salesmanName:[{value:'',disabled:true}],
      memo:[''],
      companyName:[{value:'',disabled:true}],
      distrChannelName:[{value:'',disabled:true}],
      busiUnitName:[{value:'',disabled:true}],
      saleAreaName:[{value:'',disabled:true}]
    })
    this.createForm.patchValue({orderType:"xidi"});
    this.createForm.patchValue({salePartyName:"xixi"})
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateOrderPage');
  }
  saveOrder(){
    console.log(this.orderDetail);
    this.api.post('order-platform/app/order/placeorder/addorder',{},{withCredentials:true,headers:{'Content-Type':'application/json'}})
      .subscribe((res:any)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      })
  }
  detailNumAdd(detail:any){
    detail.orderNum ++;

  }
  detailNumMinus(detail:any){
    detail.orderNum --;
  }

}
