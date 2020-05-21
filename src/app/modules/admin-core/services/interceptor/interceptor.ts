import { Injectable } from '@angular/core';

import {
    HttpRequest, HttpHandler, HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UnauthorizedComponent } from 'src/app/modules/admin-shared';
import { keyCloakService } from '../auth-service/auth.service';
import { MatDialog } from '@angular/material';
@Injectable()
export class Interceptor implements HttpInterceptor {
    token;
    constructor(private router: Router,
        public dialog: MatDialog,
        private KeycloakService: keyCloakService
        // public storage: Storage,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.KeycloakService.sendToken().token;
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    'x-auth-token': this.token,
                    'x-authenticated-user-token': this.token,
                    'Authorization': 'Bearer' + this.token
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
                        this.openDialog();
                    } else {
                        this.KeycloakService.logout();
                    }
                }
                return throwError(error);
            }));
    }

    openDialog(): void {
        const message = `You don't have right to access this site.`;
        const dialogRef = this.dialog.open(UnauthorizedComponent
            , {
                disableClose: true,
                width: '25%',
                data: { message }
            });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.KeycloakService.logout();
        });
    }
}
