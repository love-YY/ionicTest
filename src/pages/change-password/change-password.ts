import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {Api} from "../../providers";
import {HttpClient} from "@angular/common/http";

enum formName {
  userId = '用户id',
  oldPwd  ='旧密码',
  newPwd = '新密码',
  newPwd1 = '确认密码'
}

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  changePwdFrom:FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb:FormBuilder,
    public storage:Storage,
    public api:Api,
    public http:HttpClient
  ) {
    this.changePwdFrom = this.fb.group({
      userId:['',Validators.required],
      oldPwd:['',Validators.required],
      newPwd:['',Validators.required],
      newPwd1:['',Validators.required]

    });
    storage.get('user').then((data:any)=>{
      this.changePwdFrom.get('userId').setValue(data.userId);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  changePwd(){
    console.log(this.changePwdFrom.getRawValue());
    for (const i in this.changePwdFrom.controls) {
      this.changePwdFrom.controls[ i ].markAsDirty();
      this.changePwdFrom.controls[ i ].updateValueAndValidity();
      if(this.changePwdFrom.controls[i].hasError('required')){
        console.log(this.changePwdFrom.get(i));
        console.log(`${formName[i]}不能为空`);
      }
    }
    if(this.changePwdFrom.get('newPwd').value!=this.changePwdFrom.get('newPwd1').value){
      console.log('两次密码不一样');
      return;
    }
    if(this.changePwdFrom.valid){
      console.log(11111);
      console.log(this.changePwdFrom.getRawValue());
      this.api.post('order-platform/sys/system/modifyPassword',this.changePwdFrom.getRawValue())
        .subscribe((res:any)=>{
          console.log(res);
        })
    }
  }

}
