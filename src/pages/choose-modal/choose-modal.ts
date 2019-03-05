import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,InfiniteScroll,Content} from 'ionic-angular';
import {Api} from "../../providers";
import {Observable} from "rxjs/Observable";
import {concat} from "rxjs/operators";

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
  page:number = 1;
  total:number;
  enabled:boolean=true;
  @ViewChild(InfiniteScroll) downScroll:InfiniteScroll;
  @ViewChild(Content) content:Content;
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
  search():Observable<any>{
     return this.api.post('app/order/placeorder/query/querycustomer',{
      page:this.page,
      limit:25,
      requestVo:{
        customerName:this.customerName,
        customerCode:this.customerCode
      }
    });
  }
  add(goodsOwner:any){
    this.api.post('app/order/placeorder/query/querycustomerdept',{
      requestVo:{
        cusstomerId:goodsOwner.customerId,
        customerDeptCode:goodsOwner.customerCode
      }
    }).subscribe((res:any)=>{
      console.log(res);
      if(res.type=='SUCCESS'){
        let code = {...goodsOwner,...res.data[0]};
        console.log(code);
        this.viewCtrl.dismiss(code);
      }else{
        console.log(res);
      }
    });
    // this.viewCtrl.dismiss(goodsOwner);
  }
  searchCoustomer(){
    this.downScroll.enable(true);
    this.page =1;
    this.goodsOwners = [];
    this.search().subscribe((res:any)=>{
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.goodsOwners = [...this.goodsOwners,...res.data];
      }else{
        console.log(res);
      }
    })
  }
  doRefresh(e:any){
    this.downScroll.enable(true);
    this.page =1;
    this.goodsOwners=[];
    this.search().subscribe((res:any)=>{
      if(res.type=='SUCCESS'){
        this.total = res.total;
        this.goodsOwners = [...this.goodsOwners,...res.data];
        e.complete();
      }else{
        console.log(res);
        e.complete()
      }
    })
  }
  doInfinite(e:any){
    // debugger;
    console.log(e);
    if(this.goodsOwners.length<this.total){
      // debugger;
      this.page++;
      this.search()
        .subscribe((res:any)=>{
          console.log(res);
          if(res.type=='SUCCESS'){
            this.total = res.total;
            this.goodsOwners = [...this.goodsOwners,...res.data];
            e.complete();
          }else{
            console.log(res);
            e.complete()
          }
        })
    }else{
      e.enable(false);
    }
  }

}
