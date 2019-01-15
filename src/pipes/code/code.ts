import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CodePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'code'
})
export class CodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value){
      return value.replace(/\b(0+)/gi,"");
    }
  }
}
@Pipe({
  name:'status',
  pure:true
})
export class StatusPipe implements PipeTransform{
  transform(value:any){
    let status:any;
    switch (value){
      case 'N':
        status = '暂存';
        break;
      case 'R':
        status = '接收中';
        break;
      case 'S':
        status = '已提交';
        break;
      case 'D':
        status = '待收货';
        break;
      case 'C':
        status = '已收货';
        break;
      case 'B':
        status = '退回';
        break;
      case 'V':
        status = '作废';
        break;
      case 'F':
        status = '完成';
        break;
      default:
        status= '未知';
        break;
    }
    return status;
  }
}
@Pipe({
  name:'orderType',
  pure:true
})
export class OrderTypePipe implements PipeTransform{
  transform(value){
    let type:any;
    switch (value){
      case 'W':
        type = '洗涤';
        break;
      case 'S':
        type = '灭菌';
        break;
      case 'R':
        type = '租赁';
        break;
      default:
        type='未知';
        break;
    }
    return type;
  }
}
