import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
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
    public api:Api,
    private modalCtrl:ModalController
  ) {
    this.createForm = fb.group({
      orderType:[''],
      salePartyName:[{value:'',disabled:true}],
      shiptoPartyName:[{value:'',disabled:true}],
      payerName:[{value:'',disabled:true}],
      billtoPartyName:[{value:'',disabled:true}],
      salesmanName:[{value:"",disabled:false},Validators.required],
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
    console.log(this.createForm)
    console.log('ionViewDidLoad CreateOrderPage');
  }
  saveOrder(){
    console.log(this.createForm);
    this.createForm.patchValue({salesmanName:"xixi"})
    console.log(this.orderDetail);
    this.api.post('order-platform/app/order/placeorder/addorder',{},{withCredentials:true,headers:{'Content-Type':'application/json'}})
      .subscribe((res:any)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      })
  }
  chooseModal(){
    let chooseModal = this.modalCtrl.create('ChooseModalPage',{title:'123'});
    chooseModal.onDidDismiss((item)=>{
      console.log(item);
    })
    chooseModal.present();
  }
  detailNumAdd(detail:any){
    detail.orderNum ++;

  }
  detailNumMinus(detail:any){
    detail.orderNum --;
  }

}
