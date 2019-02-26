import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "name": "暂存订单",
        "profilePic": "assets/img/speakers/temp_storage.png",
        "orderStatus":"N"
      },
      {
        "name": "接收中订单",
        "profilePic": "assets/img/speakers/receiving.png",
        "orderStatus":'R'
      },
      {
        "name": "已提交",
        "profilePic": "assets/img/speakers/order_placed.png",
        "orderStatus":'S'
      },
      {
        "name": "待收货确认订单",
        "profilePic": "assets/img/speakers/order_accepted.png",
        "orderStatus":"D"
      },
      {
        "name": "全部交货单",
        "profilePic": "assets/img/speakers/order_delivery.png",
        "orderStatus":'allDelivery'
      },
      {
        "name": "全部销售订单",
        "profilePic": "assets/img/speakers/order_sale.png",
        "orderStatus":''
      },
      {
        "name": "全部销退订单",
        "profilePic": "assets/img/speakers/order_cancel.png",
        "orderStatus":'B'
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
