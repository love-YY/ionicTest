import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import {SearchReceiptPage} from "../search-receipt/search-receipt";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ChooseModalPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(orderStatus:any) {
    /*this.navCtrl.push('ItemDetailPage', {
      item: item
    });*/
    if(orderStatus==''){
      this.navCtrl.push('SearchAllPage',{orderStatus:orderStatus})
    }else if(orderStatus=='D'){
      this.navCtrl.push('SearchReceiptPage',{orderStatus:orderStatus});
    }else if(orderStatus=='B'){
      this.navCtrl.push('SearchAllRefundPage');
    }else if(orderStatus=='allDelivery'){
      console.log(111);
      this.navCtrl.push('SearchAllDeliveryPage');
    }else{
      this.navCtrl.push('SearchOrderPage',{orderStatus:orderStatus});
    }
    // this.navCtrl.push('SearchOrderPage',{orderStatus:orderStatus});

  }
}
