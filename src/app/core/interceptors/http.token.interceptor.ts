import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'api-key': '-fYsd4AW5pKz9_uV',
            'Access-Control-Allow-Origin': '*'
        };

        const token = localStorage.getItem('token');

        if (token) {
            headersConfig['auth-token'] = `${token}`;
        }

        const request = req.clone({setHeaders: headersConfig});
        return next.handle(request);
    }
}
