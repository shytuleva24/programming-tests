import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

import {AuthService} from "../admin/shared/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private auth: AuthService,
      private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.auth.isAuthenticated()) {
      request = request.clone({
        setParams: {
          auth: `${this.auth.token}`
        }
      })
    }
    return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
              console.log('[Interceptor Error]: ', error);
              if (error.status === 401) {
                this.auth.logOut();
                this.router.navigate(['/admin', 'login'], {
                  queryParams: {
                    authFailed: true
                  }
                })
              }
              return throwError(error);
            })
        );
  }
}
