import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,LoadingController,Platform } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators} from "@angular/forms";
import { User,Settings } from '../../providers';
import { MainPage } from '../';
import {Storage} from "@ionic/storage";
import {Api} from "../../providers";
import {MyServiceProvider} from "../../providers";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { loginName: string, pwd: string } = {
    loginName: 'R20190104',
    pwd: 'R20190104'
  };
  loginForm:FormGroup;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public setting:Settings,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public api:Api,
    public myService:MyServiceProvider,
    public platform:Platform,
    public fb:FormBuilder
    ) {
    this.loginForm = fb.group({
      loginName:['',Validators.required],
      pwd:['',Validators.required],
      isSave:[false]
    });
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    storage.get('loginInfo').then((res:any)=>{
      console.log(res);
      if(res){
        this.loginForm.patchValue(res);
      }
    })

    /*platform.ready().then(()=>{
      backButton.registerBackButtonAction(null);
    })*/

  }
  isSaveChange(e:any){
    console.log(e);
    this.myService.isSavePassword = e.checked;
  }

  // Attempt to login in through our User service
  doLogin() {
    this.myService.createLoading({
      content:'登陆中...'
    });
    this.api.post('sys/system/login',this.loginForm.getRawValue())
      .subscribe((resp:any)=>{
        console.log(resp);
        this.myService.dismissLoading();
        if(resp.errtype=='S'){
          this.storage.set('user',resp.data).then((res)=>{
            console.log(res);
          });
          /**/
          console.log(this.loginForm.get('isSave').value);
          if(this.loginForm.get('isSave').value){
            this.storage.set('loginInfo',this.loginForm.getRawValue()).then((res)=>{
              console.log('已保存')
            });
          }else{
            this.storage.remove('loginInfo').then((res)=>{
              console.log(res);
              console.log('remove');
            })
          }
          this.myService.loadUserAuthor(resp.data.userId);
          // this.navCtrl.push(MainPage);
          this.navCtrl.setRoot(MainPage,{},{
            animate: true,
            direction: 'forward'
          });
        }else {
          /*let toast = this.toastCtrl.create({
            message: resp.errmsg,
            duration: 3000,
            position: 'top',
            cssClass:'error'
          });
          toast.present();*/
          this.myService.createToast({
            message: resp.errmsg,
            duration: 2000,
            position: 'top',
            cssClass:'error'
          })
        }
      },(err:any)=>{
        /*let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();*/
        this.myService.createToast({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top',
          cssClass:'error'
        })
      });
    /*this.user.login(this.account).subscribe((resp:any) => {
      console.log(resp);
      loading.dismiss();
      if(resp.errtype=='S'){
        this.storage.set('user',resp.data).then((res)=>{
          console.log(res);
        });
        // this.navCtrl.push(MainPage);
        this.navCtrl.setRoot(MainPage,{},{
          animate: true,
          direction: 'forward'
        });
      }else {
        let toast = this.toastCtrl.create({
          message: resp.errmsg,
          duration: 3000,
          position: 'top',
          cssClass:'error'
        });
        toast.present();
      }

    }, (err) => {
      // this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
  }
}
