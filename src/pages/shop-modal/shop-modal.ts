import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController
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
  shopPro:any=[
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5},
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5},
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5}
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopModalPage');
  }
  closeShopModal(){
    this.viewCtrl.dismiss();
  }

}
