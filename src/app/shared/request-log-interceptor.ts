import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAuthService} from '../services/userauth.service';

@Injectable()
export class RequestLogInterceptor implements HttpInterceptor {
  token: string;

  constructor(private userAuth: UserAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.userAuth.currentUserValue) {
      this.token = 'Bearer ' + this.userAuth.currentUserValue.accessToken;
    }
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.token}`
        }
      });
    }
    return next.handle(request);
  }

  /*export class RequestLogInterceptor implements HttpInterceptor {
    req: HttpRequest<any>;

    intercept(
      request: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
      console.log(request.url);

      const accessToken = 'accessToken'
      if (accessToken) {
        request = request.clone({
          headers: this.req.headers.set(
            'Authorization',
            'Bearer ' + accessToken
          )
        });
      }
      return next.handle(request);
    }*/
}
