import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Events
} from 'ionic-angular';

/**
 * Generated class for the ShopModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-modal',
  templateUrl: 'shop-modal.html',
})
export class ShopModalPage {
  shopPro:any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public events:Events
  ) {
    console.log(navParams.data);
    this.shopPro = navParams.data.shopDetails;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopModalPage');
  }
  closeShopModal(){
    this.viewCtrl.dismiss();
  }
  detailNumMinus(detail){
    detail.orderNum--;
    this.events.publish('shopMinus',detail);
    if(detail.orderNum<1){
      this.shopPro = this.shopPro.filter(res=>res.goodsId !=detail.goodsId);
      this.events.publish('shopDel',detail);
    }
  }
  detailNumAdd(detail:any){
    detail.orderNum++;
    this.events.publish("shopAdd",detail);

  }

}
