import {Component, ViewChild,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,Content,ModalController,Events, } from 'ionic-angular';
import {Api} from "../../providers";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  animations:[
    trigger('openClose', [
      // ...
      state('open', style({
        top:`0px`,
        display:'block'
      })),
      state('closed', style({
        top:`-300px`,
        display:'none'
      })),
      transition('open => closed', [
        animate('.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class AddDetailPage {
  hidenTool =true;
  goodsCode:any;
  goodsDesc:any;
  assistantCode:any;
  selectProducts={
    type:3,
    num:34,
    detail:[
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5},
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5},
    {goodsDesc:'一曲',goodsCode:123,assistantCode:456,orderNum:5}
  ]}
  selectPros=[];
  shopDetails=[];
  shopDetailsTotal:any=0;
  isOpen:boolean = false;
  orderGenResource:any;
  @ViewChild(Content) content:Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone:NgZone,
    public modalCtr:ModalController,
    public api:Api,
    public events:Events
  ) {
    this.isOpen = true;
    events.subscribe('shopAdd',(data)=>{
      console.log(data);
      this.selectPros.forEach((res:any)=>{
        if(res.goodsId==data.goodsId){
          res.orderNum = data.orderNum;
        }
      });
      this.calculateShopDetailTotal()
    });
    events.subscribe('shopMinus',(data)=>{
      console.log(data);
      this.selectPros.forEach((res:any)=>{
        if(res.goodsId==data.goodsId){
          if(data.orderNum<1){
            delete  res.orderNum;
          }else{
            res.orderNum = data.orderNum;
          }

        }
      });
      this.calculateShopDetailTotal()
    });
    console.log(navParams.data.orderDetail);
    this.orderGenResource = navParams.data.orderGenResource;
    this.shopDetails = navParams.data.orderDetail;
    this.calculateShopDetailTotal()
    events.subscribe('shopDel',(data)=>{
      this.shopDetails=this.shopDetails.filter(res=>res.goodsId!=data.goodsId);
      this.calculateShopDetailTotal()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDetailPage');
    console.log(this.content);
    // this.content
  }
  searchPro(){
    this.api.post('app/order/placeorder/query/querymaterial',{
      requestVo:{
        goodsCode:this.goodsCode,
        goodsDesc:this.goodsDesc,
        assistantCode:this.assistantCode,
        orderGenResource:this.orderGenResource
      }
    })
      .subscribe((res:any)=>{
        console.log(res);
        if(res.type=='SUCCESS'){
          this.selectPros = res.data;
          res.data.forEach((material:any)=>{
            this.shopDetails.forEach((detail:any)=>{
              if(material.goodsId==detail.goodsId){
                material.orderNum = detail.orderNum;
              }
            })
          })
        }else{
          console.log(res.msg);
        }
      })
  }
  addShop(detail:any){
    detail.orderNum=1;
    this.shopDetails =[...this.shopDetails,JSON.parse(JSON.stringify(detail))];
    console.log(this.shopDetails)
    this.calculateShopDetailTotal()
  }
  detailNumMinus(detail:any){
    detail.orderNum--;
    this.shopDetails.forEach((res:any)=>{
      if(res.goodsId==detail.goodsId){
        res.orderNum = detail.orderNum;
      }
    });
    if(detail.orderNum<1){
      delete detail.orderNum;
      this.shopDetails = this.shopDetails.filter(res=>res.goodsId!=detail.goodsId)
    }
    this.calculateShopDetailTotal()
  }
  detailNumAdd(detail:any){
    detail.orderNum++;
    this.shopDetails.forEach((res:any)=>{
      if(res.goodsId==detail.goodsId){
        res.orderNum = detail.orderNum;
      }
    });
    this.calculateShopDetailTotal();
  }
  my_scroll(e:any){

  }
  showShop(){
    let showShopModal = this.modalCtr.create('ShopModalPage',{shopDetails:this.shopDetails},{cssClass:'my_shopModal'});
    showShopModal.onDidDismiss((item)=>{
      console.log(item);
    });
    showShopModal.present();
  }
  detailAddOrder(){
    this.events.publish('detailAddOrder',this.shopDetails);
    this.navCtrl.pop();
  }
  orderNumChange(e:any,detail){
    console.log(e);
    console.log(detail);
    console.log(this.shopDetails);
    if(!e.value||e.value<1){
      delete detail.orderNum;
      this.shopDetails = this.shopDetails.filter(res=>res.goodsId!=detail.goodsId)
    }else{
      this.shopDetails.forEach((res:any)=>{
        if(res.goodsId==detail.goodsId){
          res.orderNum = detail.orderNum;
        }
      });
    }
    this.calculateShopDetailTotal();
  }
  calculateShopDetailTotal(){
    this.shopDetailsTotal = 0;
    this.shopDetails.forEach((detail:any)=>{
      this.shopDetailsTotal+=parseInt(detail.orderNum);
    })
  }
  showSearch(){
    this.isOpen = !this.isOpen;
  }
  toolbarDone(e:any){
    this.content.resize();
  }
  /*scrollTo() {
    window.addEventListener('native.keyboardshow', (e: any) => {
      this.content.scrollTo(0, e.keyboardHeight);
    });
  }*/

}
