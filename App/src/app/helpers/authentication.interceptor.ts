import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenstorageService } from '../auth/service/tokenstorage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private token: TokenstorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const user = this.token.getToken();
    if (user == null) return next.handle(req.clone());

    authReq = req.clone({
      headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + user.accessToken),
    });
    return next.handle(authReq).pipe(
      tap(
        (succ) => {},
        (err) => {
          if (err.status === 401) {
            this.token.signOut();
            this.router.navigate(['auth/login']);
          } else if (err.status === 403) {
            this.router.navigate(['home']);
          }
        }
      )
    );
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
