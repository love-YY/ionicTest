import {Component, ViewChild,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,Content,ModalController } from 'ionic-angular';

/**
 * Generated class for the AddDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-detail',
  templateUrl: 'add-detail.html',
})
export class AddDetailPage {
  hidenTool =true;
  selectProducts={
    type:3,
    num:34,
    detail:[
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5},
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5},
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5}
  ]}
  @ViewChild(Content) content:Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone:NgZone,
    public modalCtr:ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDetailPage');
    console.log(this.content);
    // this.content
  }
  searchPro(){
    console.log(this.content.isScrolling);
    this.selectProducts.type++;
  }
  my_scroll(e:any){

  }
  showShop(){
    let showShopModal = this.modalCtr.create('ShopModalPage',{},{cssClass:'my_shopModal'});
    showShopModal.onDidDismiss((item)=>{
      console.log(item);
    })
    showShopModal.present();
  }


}
