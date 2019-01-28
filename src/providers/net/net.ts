import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Injectable,Injector,Inject } from '@angular/core';
import {Observable} from "rxjs";
import {mergeMap,catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {MyServiceProvider} from "../my-service/my-service";

@Injectable()
export class NetProvider implements HttpInterceptor{

  loading:any;


  constructor(
    private injector:Injector,
    private myService:MyServiceProvider
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
    > {
    // 统一加上服务端前缀
    let url = req.url;
    // let loading;
    // set auth t/*if (!url.startsWith('https://') && !url.startsWith('http://')) {
    //       url = environment.SERVER_URL + url;
    //     }*/oken
    const newReq = req.clone({
      url: url,
      withCredentials:true,
      setHeaders:{
        'Content-Type':'application/json',
      }
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponse && event.status === 200)
          return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }


  private handleData(
    event: HttpResponse<any> | HttpErrorResponse
  ): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    // this.injector.get(_HttpClient).end();
    // 业务处理：一些通用操作

    switch (event.status) {
      case 200:
        // console.log(event);
        // console.log('很稳');
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        /*if (event instanceof HttpResponse) {
            const body: any = event.body;
            if (body && body.status !== 0) {
                // this.msg.error(body.msg);
                // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
                // this.http.get('/').subscribe() 并不会触发
                return ;
            } else {
                // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
                return of(new HttpResponse(Object.assign(event, { body: body.response })));
                // 或者依然保持完整的格式
                return of(event);
            }
        }*/
        if(event instanceof HttpResponse){
          const body :any = event.body;
          if(body && body.type=='SUCCESS' || body.errtype=='S'){
            console.log(event);
            return of(event);
          }else{
            console.log(body.errmsg || body.msg);
            if(body.errmsg || body.msg)
            this.myService.createToast({
              message:body.errmsg || body.msg,
              position:'top',
              cssClass:'error',
              duration:2000
            })
          }
        }
        break;
      case 400:
        console.log(event);
        console.log('参数不对');
        this.exceptionHanding(`${event.status}|参数不正确!`);
        break;
      case 401: // 未登录状态码
        /*this.tokenService.clear();
        this.goTo('/passport/login');*/
        console.log('登陆信息过期');
        this.exceptionHanding(`${event.status}|登陆信息过期!`);
        break;
      case 404:
        this.exceptionHanding(`${event.status}|未找到!`);
        break;
      case 500:
        console.log('服务器问题');
        this.exceptionHanding(`${event.status}|服务器错误!`);
        // this.goTo(`/${event.status}`);
        break;
      default:
        this.exceptionHanding(`${event.status}|未知错误!`);
        if (event instanceof HttpErrorResponse) {
          console.warn(event);
        }
        break;
    }
    return of(event);
  }
  exceptionHanding(message:string){
    if(this.myService.getLoading()){
      this.myService.dismissLoading();
    }
    this.myService.createToast({
      message:message,
      cssClass:'error',
      position:'top',
      duration:2000
    });
  }
}
