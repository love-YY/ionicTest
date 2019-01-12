import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";

/**
 * Generated class for the ReceiptOrderTitlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt-order-title',
  templateUrl: 'receipt-order-title.html',
})
export class ReceiptOrderTitlePage {

  receiptForm:FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder
  ) {
    this.receiptForm = fb.group({
      orderId:[''],
      orderType:[{value:'',disabled:true}],
      salePartyId:[''],
      salePartyCode:[''],
      salePartyName:[{value:'',disabled:true},Validators.required],
      customerDeptId:[''],
      customerDeptCode:[''],
      customerDeptName:[{value:'',disabled:true}],
      payerName:[{value:'',disabled:true}],
      billtoPartyName:[{value:'',disabled:true}],
      salesmanId:[''],
      salesmanCode:[''],
      salesmanName:[{value:"",disabled:true},Validators.required],
      memo:[{value:'',disabled:true}],
      companyName:[{value:'',disabled:true}],
      distrChannelName:[{value:'',disabled:true}],
      busiUnitName:[{value:'',disabled:true}],
      saleAreaName:[{value:'',disabled:true}],
      a:[{value:0,disabled:true}]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptOrderTitlePage');
  }

}
