import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class Interceptor implements HttpInterceptor {
    token;
    constructor(private router: Router,
        // public storage: Storage,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem('access-token');
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    'x-auth-token': this.token,
                    'x-authenticated-user-token': this.token,
                    'Authorization': 'Bearer' + this.token
                }
            });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (error.error.success === false) {
                        // this.presentToast('Login failed');
                    } else {
                        this.router.navigate(['login']);
                    }
                }
                return throwError(error);
            }));
    }
}
