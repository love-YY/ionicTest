import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReceiptOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt-order-detail',
  templateUrl: 'receipt-order-detail.html',
})
export class ReceiptOrderDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptOrderDetailPage');
  }

}
