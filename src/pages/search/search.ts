import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import {Storage} from "@ionic/storage";
import {Api} from "../../providers";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public items: Items,
    public storage:Storage,
    public api:Api,
    public toastCtrl:ToastController
  ) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(orderType:any) {
    /*this.navCtrl.push('ItemDetailPage', {
      item: item
    });*/
    this.storage.get('user').then((data)=>{
      this.api.post(`order-platform/app/order/placeorder/query/newInitOrder?companyId=${data.companyId}`,{})
        .subscribe((res:any)=>{
          if(res.type=='SUCCESS'){
            // this.createForm.patchValue(res.data);
            this.navCtrl.push('CreateOrderPage',{orderType:orderType,moreData:res.data});
          }else{
            let toast = this.toastCtrl.create({
              message: res.msg,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
        })
    });

  }

}
