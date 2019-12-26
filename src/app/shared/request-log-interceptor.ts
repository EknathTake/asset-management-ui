import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class RequestLogInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = 'Bearer ' + this.cookieService.get('accessToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }

    console.log('Intercepted HTTP call', request);

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
