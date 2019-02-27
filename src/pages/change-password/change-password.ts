import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {Api} from "../../providers";
import {HttpClient} from "@angular/common/http";
import {MyServiceProvider} from "../../providers";

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
    public http:HttpClient,
    public myService:MyServiceProvider,
    public app:App
  ) {
    this.changePwdFrom = this.fb.group({
      userId:['',Validators.required],
      loginName:[{value:null,disabled:true}],
      oldPwd:['',Validators.required],
      newPwd:['',Validators.required],
      newPwd1:['',Validators.required]

    },{validator:this.confirmValidator});
    storage.get('user').then((data:any)=>{
      this.changePwdFrom.get('userId').setValue(data.userId);
      this.changePwdFrom.get('loginName').setValue(data.loginName);
    });

  }

  ionViewDidLoad() {
  }
  changePwd(){
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

      this.api.post('app/user/modifysecret',this.changePwdFrom.getRawValue())
        .subscribe((res:any)=>{
          if(res.type=='SUCCESS'){
            this.myService.createToast({
              message:'修改密码成功',
              cssClass:'success',
              position:'top',
              duration:2000
            });

            this.storage.get('loginInfo').then((res:any)=>{
              if(res){
                console.log(res);
                res.pwd = '';
                this.storage.set('loginInfo',res).then(()=>{
                  this.app.getRootNav().setRoot('LoginPage');
                });
              }else{
                this.app.getRootNav().setRoot('LoginPage');
              }
            });

          }else{
            console.log(res);
          }
        })
    }
  }
  //自定义验证证器（用于验证表单确认密码与新密码是否一致）
  confirmValidator:ValidatorFn = (control:FormGroup):ValidationErrors|null=>{
    // debugger;
    const newPwd = control.get('newPwd');
    const newPwd1 = control.get('newPwd1');
    return newPwd && newPwd1 && newPwd.value != newPwd1.value?{'confirmPwd':true}:null;
  }

}


