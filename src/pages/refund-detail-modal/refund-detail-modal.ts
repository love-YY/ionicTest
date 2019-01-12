import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events} from 'ionic-angular';

/**
 * Generated class for the RefundDetailModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refund-detail-modal',
  templateUrl: 'refund-detail-modal.html',
})
export class RefundDetailModalPage {

  details:any=[];
  refundDetails:any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public events:Events
  ) {
    this.details = navParams.data.detail;
    this.refundDetails = navParams.data.addDetail;
    console.log(this.details);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefundDetailModalPage');
  }
  selectCancel(){
    this.viewCtrl.dismiss();
  }
  addRefund(detail){
    if(detail.retiringNum<=0){

    }else{
      detail.returnNum = 1;
      this.refundDetails = [...this.refundDetails,JSON.parse(JSON.stringify(detail))]
    }

  }
  detailNumMinus(detail){
    detail.returnNum--;
    if(detail.returnNum<1){
      delete detail.returnNum;
      this.refundDetails = this.refundDetails.filter(res=>res.goodsId!=detail.goodsId);
    }else{
      this.refundDetails.forEach((res:any)=>{
        if(res.goodsId==detail.goodsId){
          res.returnNum = detail.returnNum;
          console.log(res);
        }
      })
    }
  }
  detailNumAdd(detail){

    if(detail.returnNum>=detail.retiringNum){

    }else{
      detail.returnNum++;
      this.refundDetails.forEach((res:any)=>{
        if(res.goodsId==detail.goodsId){
          res.returnNum = detail.returnNum;
        }
      })
    }
  }
  detailsAddRefund(){
    console.log(this.refundDetails);
    this.events.publish('addrRefundDetail',this.refundDetails);
    this.viewCtrl.dismiss();
  }

}
